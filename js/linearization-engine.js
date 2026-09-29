/* =========================================================================
   linearization-engine.js
   Shared data / fitting / plotting engine for the linearization materials.

   Used by:
     AP Resource Pages/linearizationInteractive.html  (student guide)
     AP Resource Pages/linearizationPresent.html      (classroom presenter)

   Plain global script (no ES modules) so the pages also work when opened
   directly from the filesystem, not just over GitHub Pages.
   ========================================================================= */
(function (global) {
  'use strict';

  /* ---------------------------------------------------------------- random */

  // Seeded PRNG so a given scenario always regenerates identical data.
  // Matters in class: "run it again" must not silently change the numbers.
  function mulberry32(seed) {
    let t = seed >>> 0;
    return function () {
      t += 0x6D2B79F5;
      let r = t;
      r = Math.imul(r ^ (r >>> 15), r | 1);
      r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
      return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };
  }

  // Box-Muller, so scatter looks like real measurement error rather than
  // the flat-topped band you get from a bare uniform random.
  function gaussian(rand) {
    const u = Math.max(rand(), 1e-12), v = rand();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }

  /* ----------------------------------------------------------- unit algebra */

  // Slope units must be DERIVED from the axis units, never typed by hand.
  // That means real cancellation: (W/m²) ÷ (1/m²) has to come out as W, not
  // as the nonsense string "W/m²/1/m²".
  function parseUnit(u) {
    if (!u) return { num: [], den: [] };
    const halves = String(u).split('/');
    const num = halves[0].split('·').filter(Boolean);
    const den = halves.slice(1).join('·').split('·').filter(Boolean);
    return { num: num, den: den };
  }

  function unitMul(a, b) {
    return { num: a.num.concat(b.num), den: a.den.concat(b.den) };
  }
  function unitInv(a) { return { num: a.den.slice(), den: a.num.slice() }; }
  function unitDiv(a, b) { return unitMul(a, unitInv(b)); }
  function unitPow2(a) {
    return { num: a.num.map(sq), den: a.den.map(sq) };
  }
  function unitRoot(a) {
    return { num: a.num.map(rt), den: a.den.map(rt) };
  }
  function sq(f) { return /²$/.test(f) ? f.replace(/²$/, '⁴') : f + '²'; }
  function rt(f) { return /²$/.test(f) ? f.replace(/²$/, '') : '√' + f; }

  function unitStr(U) {
    const num = U.num.slice(), den = U.den.slice();
    for (let i = num.length - 1; i >= 0; i--) {         // cancel like factors
      const j = den.indexOf(num[i]);
      if (j >= 0) { num.splice(i, 1); den.splice(j, 1); }
    }
    if (!num.length && !den.length) return '';
    const n = num.length ? num.join('·') : '1';
    return den.length ? n + '/' + den.join('·') : n;
  }

  /* ------------------------------------------------------------ transforms */

  // Every transform a student can choose. Exactly one is right for a given
  // relationship; the wrong ones are the point of the exercise.
  const TRANSFORMS = {
    none: {
      id: 'none', label: 'y vs x', short: 'leave it alone', axis: null,
      fx: function (x) { return x; }, fy: function (y) { return y; },
      xLabel: function (t) { return t; }, yLabel: function (t) { return t; },
      xUnit: function (U) { return U; }, yUnit: function (U) { return U; }
    },
    x2: {
      id: 'x2', label: 'y vs x²', short: 'square x', axis: 'x',
      fx: function (x) { return x * x; }, fy: function (y) { return y; },
      xLabel: function (t) { return t + '²'; }, yLabel: function (t) { return t; },
      xUnit: unitPow2, yUnit: function (U) { return U; }
    },
    sqrtx: {
      id: 'sqrtx', label: 'y vs √x', short: 'take √x', axis: 'x',
      fx: function (x) { return Math.sqrt(x); }, fy: function (y) { return y; },
      xLabel: function (t) { return '√' + t; }, yLabel: function (t) { return t; },
      xUnit: unitRoot, yUnit: function (U) { return U; }
    },
    invx: {
      id: 'invx', label: 'y vs 1/x', short: 'invert x', axis: 'x',
      fx: function (x) { return 1 / x; }, fy: function (y) { return y; },
      xLabel: function (t) { return '1/' + t; }, yLabel: function (t) { return t; },
      xUnit: unitInv, yUnit: function (U) { return U; }
    },
    invx2: {
      id: 'invx2', label: 'y vs 1/x²', short: 'invert x²', axis: 'x',
      fx: function (x) { return 1 / (x * x); }, fy: function (y) { return y; },
      xLabel: function (t) { return '1/' + t + '²'; }, yLabel: function (t) { return t; },
      xUnit: function (U) { return unitInv(unitPow2(U)); }, yUnit: function (U) { return U; }
    },
    y2: {
      id: 'y2', label: 'y² vs x', short: 'square y', axis: 'y',
      fx: function (x) { return x; }, fy: function (y) { return y * y; },
      xLabel: function (t) { return t; }, yLabel: function (t) { return t + '²'; },
      xUnit: function (U) { return U; }, yUnit: unitPow2
    }
  };

  const TRANSFORM_ORDER = ['none', 'x2', 'sqrtx', 'invx', 'invx2', 'y2'];

  /* ------------------------------------------------------------- scenarios */

  // Each scenario is a real lab, not an abstract y = ax². The variable names
  // and units travel with the data so the slope carries honest units.
  const SCENARIOS = [
    {
      id: 'freefall',
      seed: 1738,
      title: 'Free Fall',
      blurb: 'You film a dropped ball and measure how far it has fallen at a series of times.',
      theory: 'd = ½ g t²',
      xVar: 't', xUnit: 's', yVar: 'd', yUnit: 'm',
      xMin: 0.10, xMax: 0.80, n: 9, noise: 0.022,
      f: t => 0.5 * 9.81 * t * t,
      correct: 'x2',
      // What the slope means, and how to get the physics out of it.
      slopeMeans: 'slope = ½g',
      constantName: 'g',
      constantUnit: 'm/s²',
      constantExpr: 'g = 2 × slope',
      constantFromSlope: s => 2 * s,
      accepted: 9.81,
      wrongHint: {
        sqrtx: 'Rooting t makes the curve bend even harder. You moved the wrong way.',
        invx:  'Inverting t turns an increasing curve into a decreasing one. Not this.',
        invx2: 'Inverting t² does the same thing, harder. Not this.',
        y2:    'Squaring d gives d² ∝ t⁴. You made the curvature worse, not better.',
        none:  'That is the raw data — still curved. That is the problem we started with.'
      }
    },
    {
      id: 'pendulum',
      seed: 5379,
      title: 'Pendulum',
      blurb: 'You time 10 swings of a pendulum at several different lengths.',
      theory: 'T = 2π √(L / g)',
      xVar: 'L', xUnit: 'm', yVar: 'T', yUnit: 's',
      xMin: 0.15, xMax: 1.20, n: 9, noise: 0.012,
      f: L => 2 * Math.PI * Math.sqrt(L / 9.81),
      correct: 'y2',
      slopeMeans: 'slope = 4π² / g',
      constantName: 'g',
      constantUnit: 'm/s²',
      constantExpr: 'g = 4π² / slope',
      constantFromSlope: s => (4 * Math.PI * Math.PI) / s,
      accepted: 9.81,
      // This is the scenario where slope ≠ the constant. That is the lesson.
      headline: 'Here the slope is NOT the answer.',
      wrongHint: {
        x2:    'Squaring L bends it the other way — now it curves upward. Overshot.',
        sqrtx: 'Rooting L straightens it too! Both √L and T² work here. Nice.',
        invx:  'Inverting L flips the trend entirely. Not this.',
        invx2: 'Inverting L² flips it and exaggerates it. Not this.',
        none:  'That is the raw data — still curved.'
      },
      altMessage: 'That straightens it too — √L vs T works. But then the slope is 2π/√g, not 4π²/g. Two right answers, two different slopes to interpret.',
      alsoWorks: ['sqrtx']
    },
    {
      id: 'boyle',
      seed: 1631,
      title: "Boyle's Law",
      blurb: 'You squeeze a sealed syringe and read the pressure at several volumes.',
      theory: 'P = nRT / V',
      xVar: 'V', xUnit: 'mL', yVar: 'P', yUnit: 'kPa',
      xMin: 8, xMax: 35, n: 9, noise: 0.018,
      f: V => 2400 / V,
      correct: 'invx',
      slopeMeans: 'slope = nRT',
      constantName: 'nRT',
      constantUnit: 'kPa·mL',
      constantExpr: 'nRT = slope',
      constantFromSlope: s => s,
      accepted: 2400,
      wrongHint: {
        x2:    'Squaring V makes a decreasing curve decrease even more sharply. Wrong way.',
        sqrtx: 'Rooting V softens the curve but does not straighten it.',
        invx2: 'Close! But 1/V² over-corrects and bends it the other way.',
        y2:    'Squaring P makes the drop steeper still. Wrong way.',
        none:  'That is the raw data — still curved.'
      }
    },
    {
      id: 'intensity',
      seed: 4112,
      title: 'Light Intensity',
      blurb: 'You walk a light sensor away from a bulb and record intensity at each distance.',
      theory: 'I = P / (4π r²)',
      xVar: 'r', xUnit: 'm', yVar: 'I', yUnit: 'W/m²',
      xMin: 0.25, xMax: 1.50, n: 9, noise: 0.020,
      f: r => 60 / (4 * Math.PI * r * r),
      correct: 'invx2',
      slopeMeans: 'slope = P / 4π',
      constantName: 'P',
      constantUnit: 'W',
      constantExpr: 'P = 4π × slope',
      constantFromSlope: s => 4 * Math.PI * s,
      accepted: 60,
      wrongHint: {
        x2:    'Squaring r makes the fall-off look even more extreme. Wrong direction.',
        sqrtx: 'Rooting r barely touches it. Still curved.',
        invx:  'Close! 1/r straightens it partway, but it still bends. The exponent matters.',
        y2:    'Squaring I gives I² ∝ 1/r⁴. Worse.',
        none:  'That is the raw data — still curved.'
      }
    }
  ];

  function scenarioById(id) {
    return SCENARIOS.filter(function (s) { return s.id === id; })[0] || SCENARIOS[0];
  }

  /* ------------------------------------------------------------------ data */

  function generate(scenario, seed) {
    // Default to the scenario's tuned seed: the demo has to produce a believable
    // lab result (g within ~1%) every single time you show it to a class.
    const rand = mulberry32(seed == null ? (scenario.seed || 1) : seed);
    const pts = [];
    const step = (scenario.xMax - scenario.xMin) / (scenario.n - 1);
    for (let i = 0; i < scenario.n; i++) {
      const x = scenario.xMin + i * step;
      const clean = scenario.f(x);
      const y = clean * (1 + gaussian(rand) * scenario.noise);
      pts.push({ x: x, y: y, clean: clean });
    }
    return pts;
  }

  function transform(points, transformId) {
    const T = TRANSFORMS[transformId];
    return points.map(function (p) {
      return { x: T.fx(p.x), y: T.fy(p.y) };
    });
  }

  /* --------------------------------------------------------------- fitting */

  // Ordinary least squares with an intercept. The intercept is returned and
  // reported — a suppressed intercept hides half of what a graph can tell you.
  function fitLine(points) {
    const n = points.length;
    let sx = 0, sy = 0, sxy = 0, sxx = 0;
    for (let i = 0; i < n; i++) {
      sx += points[i].x; sy += points[i].y;
      sxy += points[i].x * points[i].y;
      sxx += points[i].x * points[i].x;
    }
    const denom = n * sxx - sx * sx;
    const slope = denom === 0 ? 0 : (n * sxy - sx * sy) / denom;
    const intercept = (sy - slope * sx) / n;

    const mean = sy / n;
    let ssTot = 0, ssRes = 0;
    for (let i = 0; i < n; i++) {
      const pred = slope * points[i].x + intercept;
      ssTot += Math.pow(points[i].y - mean, 2);
      ssRes += Math.pow(points[i].y - pred, 2);
    }
    const r2 = ssTot === 0 ? 1 : 1 - ssRes / ssTot;
    return { slope: slope, intercept: intercept, r2: r2 };
  }

  // Signed curvature of the residuals about a straight-line fit, normalised by
  // the spread of the data so the number is comparable ACROSS transforms.
  // Positive => the data still bows one way off the line, negative => it has
  // been bent back the other way. That sign is what lets a wrong pick say
  // "you over-corrected" instead of just "no".
  function residualCurvature(points) {
    const n = points.length;
    if (n < 4) return 0;
    const fit = fitLine(points);
    const ys = points.map(function (p) { return p.y; });
    const spread = Math.max.apply(null, ys) - Math.min.apply(null, ys);
    if (!isFinite(spread) || spread === 0) return 0;

    const third = Math.max(1, Math.floor(n / 3));
    let ends = 0, middle = 0, ne = 0, nm = 0;
    for (let i = 0; i < n; i++) {
      const resid = (points[i].y - (fit.slope * points[i].x + fit.intercept)) / spread;
      if (i < third || i >= n - third) { ends += resid; ne++; }
      else { middle += resid; nm++; }
    }
    return (ends / ne) - (middle / nm);
  }

  /* ---------------------------------------------------------------- canvas */

  function themeColors() {
    const dark = document.body.getAttribute('data-theme') === 'dark';
    return dark
      ? { grid: '#403E39', axis: '#9C8F70', text: '#F2F0E5', muted: '#B5A988',
          point: '#4385BE', line: '#D14D41', good: '#879A39', bad: '#D14D41',
          bg: '#100F0F' }
      : { grid: '#E6E2CC', axis: '#847759', text: '#1C1B1A', muted: '#6F6144',
          point: '#205EA6', line: '#AF3029', good: '#66800B', bad: '#AF3029',
          bg: '#FFFCF0' };
  }

  // Standard "nice number" tick selection, so axes read 0, 0.2, 0.4 …
  // instead of 0.173, 0.346. Students have to be able to read a slope off
  // the graph by hand; that is impossible without labelled ticks.
  function niceNum(range, round) {
    const exp = Math.floor(Math.log10(range));
    const frac = range / Math.pow(10, exp);
    let nice;
    if (round) {
      nice = frac < 1.5 ? 1 : frac < 3 ? 2 : frac < 7 ? 5 : 10;
    } else {
      nice = frac <= 1 ? 1 : frac <= 2 ? 2 : frac <= 5 ? 5 : 10;
    }
    return nice * Math.pow(10, exp);
  }

  function makeTicks(min, max, count) {
    if (!isFinite(min) || !isFinite(max) || min === max) return [min];
    const range = niceNum(max - min, false);
    const step = niceNum(range / Math.max(1, count - 1), true);
    const start = Math.floor(min / step) * step;
    const end = Math.ceil(max / step) * step;
    const out = [];
    for (let v = start; v <= end + step * 0.5; v += step) {
      if (v >= min - step * 0.001 && v <= max + step * 0.001) {
        out.push(Math.abs(v) < step * 1e-6 ? 0 : v);
      }
    }
    return out;
  }

  function fmtTick(v, step) {
    if (v === 0) return '0';
    const a = Math.abs(v);
    if (a >= 10000 || a < 0.001) return v.toExponential(1);
    const decimals = a >= 100 ? 0 : a >= 10 ? 1 : a >= 1 ? 1 : 2;
    return v.toFixed(decimals);
  }

  // Ranges always include zero when the data is one-signed. Zero-suppressed
  // axes make every fit look like it passes through the origin, which is the
  // single most misleading thing a physics graph can do.
  function autoRange(values, includeZero) {
    let lo = Math.min.apply(null, values);
    let hi = Math.max.apply(null, values);
    if (includeZero !== false) {
      if (lo > 0) lo = 0;
      if (hi < 0) hi = 0;
    }
    if (lo === hi) { lo -= 1; hi += 1; }
    const pad = (hi - lo) * 0.08;
    return [lo === 0 ? 0 : lo - pad, hi + pad];
  }

  function prepareCanvas(canvas) {
    const dpr = global.devicePixelRatio || 1;
    const cssW = canvas.clientWidth || canvas.offsetWidth;
    const cssH = canvas.clientHeight || canvas.offsetHeight;
    // Backing store at device resolution, drawing in CSS pixels. Without this
    // every plot is soft on a retina display and on most classroom projectors.
    if (canvas.width !== Math.round(cssW * dpr) || canvas.height !== Math.round(cssH * dpr)) {
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
    }
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);
    return { ctx: ctx, w: cssW, h: cssH };
  }

  /**
   * Draw a scatter plot with labelled axes.
   *
   * opts = {
   *   points, line:{slope,intercept}, curve:fn,
   *   xLabel, yLabel, xRange, yRange,
   *   big:Boolean            // projector sizing
   *   showTicks:Boolean
   *   lineColor, pointColor
   *   highlight:Number       // index of a point to emphasise
   * }
   */
  function plot(canvas, opts) {
    const c = themeColors();
    const g = prepareCanvas(canvas);
    const ctx = g.ctx;
    const big = !!opts.big;

    // In projector mode the plot's type is derived from the page's own base
    // font size, so bumping the deck's type scales the axes with it instead of
    // leaving 20px tick labels stranded next to 30px body text.
    var base = 16;
    if (big) {
      try { base = parseFloat(getComputedStyle(document.body).fontSize) || 16; }
      catch (e) { base = 22; }
    }
    const fontSize   = big ? Math.round(base * 0.92) : 12;
    const labelSize  = big ? Math.round(base * 1.15) : 14;
    const padL = big ? Math.round(fontSize * 2.6 + labelSize * 1.2) : 56;
    const padB = big ? Math.round(fontSize * 1.3 + labelSize * 1.5) : 48;
    const padT = big ? Math.round(labelSize) : 16;
    const padR = big ? Math.round(labelSize * 1.2) : 20;

    const pts = opts.points || [];
    const xs = pts.map(function (p) { return p.x; });
    const ys = pts.map(function (p) { return p.y; });
    const xR = opts.xRange || autoRange(xs.length ? xs : [0, 1], true);
    const yR = opts.yRange || autoRange(ys.length ? ys : [0, 1], true);

    const plotW = g.w - padL - padR;
    const plotH = g.h - padT - padB;
    if (plotW <= 0 || plotH <= 0) return;

    function sx(x) { return padL + ((x - xR[0]) / (xR[1] - xR[0])) * plotW; }
    function sy(y) { return padT + plotH - ((y - yR[0]) / (yR[1] - yR[0])) * plotH; }

    const showTicks = opts.showTicks !== false;
    const xTicks = showTicks ? makeTicks(xR[0], xR[1], big ? 6 : 5) : [];
    const yTicks = showTicks ? makeTicks(yR[0], yR[1], big ? 6 : 5) : [];

    // grid
    ctx.strokeStyle = c.grid;
    ctx.lineWidth = 1;
    ctx.beginPath();
    xTicks.forEach(function (t) {
      ctx.moveTo(Math.round(sx(t)) + 0.5, padT);
      ctx.lineTo(Math.round(sx(t)) + 0.5, padT + plotH);
    });
    yTicks.forEach(function (t) {
      ctx.moveTo(padL, Math.round(sy(t)) + 0.5);
      ctx.lineTo(padL + plotW, Math.round(sy(t)) + 0.5);
    });
    ctx.stroke();

    // axes
    ctx.strokeStyle = c.axis;
    ctx.lineWidth = big ? Math.max(2, Math.round(base * 0.11)) : 2;
    ctx.beginPath();
    ctx.moveTo(padL, padT);
    ctx.lineTo(padL, padT + plotH);
    ctx.lineTo(padL + plotW, padT + plotH);
    ctx.stroke();

    // tick labels
    if (showTicks) {
      ctx.fillStyle = c.muted;
      ctx.font = fontSize + 'px "Fira Code", "SF Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      xTicks.forEach(function (t) {
        ctx.fillText(fmtTick(t), sx(t), padT + plotH + (big ? Math.round(fontSize*0.45) : 8));
      });
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      yTicks.forEach(function (t) {
        ctx.fillText(fmtTick(t), padL - (big ? Math.round(fontSize*0.45) : 8), sy(t));
      });
    }

    // axis titles
    ctx.fillStyle = c.text;
    ctx.font = '600 ' + labelSize + 'px "Fira Code", "SF Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    if (opts.xLabel) ctx.fillText(opts.xLabel, padL + plotW / 2, g.h - (big ? Math.round(labelSize*0.25) : 4));
    if (opts.yLabel) {
      ctx.save();
      ctx.translate(big ? Math.round(labelSize * 0.85) : 14, padT + plotH / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.textBaseline = 'middle';
      ctx.fillText(opts.yLabel, 0, 0);
      ctx.restore();
    }

    // smooth theory curve
    if (opts.curve) {
      ctx.strokeStyle = opts.lineColor || c.line;
      ctx.lineWidth = big ? Math.max(3, base * 0.15) : 2.5;
      ctx.beginPath();
      let started = false;
      for (let i = 0; i <= 160; i++) {
        const x = xR[0] + (xR[1] - xR[0]) * (i / 160);
        const y = opts.curve(x);
        if (!isFinite(y) || y < yR[0] || y > yR[1]) { started = false; continue; }
        const px = sx(x), py = sy(y);
        if (!started) { ctx.moveTo(px, py); started = true; } else { ctx.lineTo(px, py); }
      }
      ctx.stroke();
    }

    // best-fit line, clipped to the plotting box
    if (opts.line) {
      const m = opts.line.slope, b = opts.line.intercept;
      ctx.save();
      ctx.beginPath();
      ctx.rect(padL, padT, plotW, plotH);
      ctx.clip();
      ctx.strokeStyle = opts.lineColor || c.line;
      ctx.lineWidth = big ? Math.max(3, base * 0.15) : 2.5;
      ctx.beginPath();
      ctx.moveTo(sx(xR[0]), sy(m * xR[0] + b));
      ctx.lineTo(sx(xR[1]), sy(m * xR[1] + b));
      ctx.stroke();
      ctx.restore();
    }

    // data points
    const r = big ? Math.max(6, Math.round(base * 0.30)) : 5;
    pts.forEach(function (p, i) {
      const inside = p.x >= xR[0] && p.x <= xR[1] && p.y >= yR[0] && p.y <= yR[1];
      if (!inside) return;
      ctx.beginPath();
      ctx.arc(sx(p.x), sy(p.y), i === opts.highlight ? r * 1.5 : r, 0, 2 * Math.PI);
      ctx.fillStyle = opts.pointColor || c.point;
      ctx.fill();
      ctx.lineWidth = big ? Math.max(2, base * 0.09) : 1.5;
      ctx.strokeStyle = c.bg;
      ctx.stroke();
    });
  }

  /* --------------------------------------------------------- accessibility */

  // Canvas is invisible to a screen reader. Every plot gets a real table of
  // the plotted numbers so the graph is never the only way to get the data.
  function dataTableHTML(points, xLabel, yLabel, caption) {
    let h = '<table><caption>' + (caption || 'Plotted data') + '</caption><thead><tr><th scope="col">' +
            xLabel + '</th><th scope="col">' + yLabel + '</th></tr></thead><tbody>';
    points.forEach(function (p) {
      h += '<tr><td>' + fmtNum(p.x) + '</td><td>' + fmtNum(p.y) + '</td></tr>';
    });
    return h + '</tbody></table>';
  }

  function fmtNum(v) {
    const a = Math.abs(v);
    if (a === 0) return '0';
    if (a >= 10000 || a < 0.001) return v.toExponential(2);
    return v.toPrecision(a >= 100 ? 4 : 3);
  }

  /* ----------------------------------------------------------- evaluations */

  /**
   * Judge a student's chosen transform against a scenario.
   * Returns everything the UI needs to give real feedback.
   */
  function evaluate(scenario, points, transformId) {
    const T = TRANSFORMS[transformId];
    const tp = transform(points, transformId);
    const fit = fitLine(tp);
    const curvature = residualCurvature(tp);

    const isExact = transformId === scenario.correct;
    const isAlt   = (scenario.alsoWorks || []).indexOf(transformId) >= 0;

    const xLabel = T.xLabel(scenario.xVar);
    const yLabel = T.yLabel(scenario.yVar);
    const xU = T.xUnit(parseUnit(scenario.xUnit));
    const yU = T.yUnit(parseUnit(scenario.yUnit));

    // The constant comes from the slope by the scenario's OWN rule. It is not
    // simply "the slope" — for the pendulum it is 4π²/slope. Copying the slope
    // straight into the answer is the exact mistake this page exists to kill.
    const constant = isExact ? scenario.constantFromSlope(fit.slope) : null;

    return {
      transform: T,
      points: tp,
      fit: fit,
      curvature: curvature,
      correct: isExact || isAlt,
      exact: isExact,
      alternate: isAlt,
      xLabelBare: xLabel,
      yLabelBare: yLabel,
      xUnits: unitStr(xU),
      yUnits: unitStr(yU),
      xLabel: xLabel + (unitStr(xU) ? ' (' + unitStr(xU) + ')' : ''),
      yLabel: yLabel + (unitStr(yU) ? ' (' + unitStr(yU) + ')' : ''),
      slopeUnits: unitStr(unitDiv(yU, xU)),
      interceptUnits: unitStr(yU),
      constant: constant,
      percentError: constant != null && scenario.accepted
        ? Math.abs(constant - scenario.accepted) / scenario.accepted * 100
        : null,
      message: isExact ? null
             : isAlt ? (scenario.altMessage || 'That straightens it too — but read the slope carefully, it means something different.')
             : (scenario.wrongHint || {})[transformId] ||
               'That transform does not straighten this relationship.'
    };
  }

  /* ----------------------------------------------------------------- expose */

  global.LinEngine = {
    TRANSFORMS: TRANSFORMS,
    TRANSFORM_ORDER: TRANSFORM_ORDER,
    SCENARIOS: SCENARIOS,
    scenarioById: scenarioById,
    generate: generate,
    transform: transform,
    fitLine: fitLine,
    residualCurvature: residualCurvature,
    evaluate: evaluate,
    plot: plot,
    themeColors: themeColors,
    autoRange: autoRange,
    dataTableHTML: dataTableHTML,
    parseUnit: parseUnit,
    unitStr: unitStr,
    unitDiv: unitDiv,
    fmtNum: fmtNum,
    prepareCanvas: prepareCanvas
  };

})(window);
