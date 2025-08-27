#!/usr/bin/env python3
"""
Convert AP Physics Fact Sheet PDF content to structured HTML
"""

import re
import html

def clean_text(text):
    """Clean and format text content"""
    # Remove extra whitespace
    text = re.sub(r'\s+', ' ', text.strip())
    # Fix common formatting issues
    text = text.replace('∆x', 'Δx').replace('∆y', 'Δy')
    text = text.replace('¯v', 'v̄')
    return text

def parse_factsheet_content():
    """Parse the extracted PDF content and convert to HTML structure"""
    
    with open('factsheet_extracted.txt', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Split by pages and combine
    pages = content.split('--- PAGE')
    full_text = ''
    for page in pages[1:]:  # Skip first empty split
        # Remove page headers
        lines = page.split('\n')
        filtered_lines = []
        for line in lines:
            if not re.match(r'AP Physics Fact Sheet: Page \d+ of \d+', line):
                filtered_lines.append(line)
        full_text += '\n'.join(filtered_lines) + '\n'
    
    # Parse sections
    sections = {}
    current_section = None
    current_subsection = None
    content_buffer = []
    
    lines = full_text.split('\n')
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
            
        # Check for main sections (1 Kinematics, 2 Dynamics, etc.)
        main_match = re.match(r'^(\d+)\s+(.+)$', line)
        if main_match and len(main_match.group(1)) == 1:
            # Save previous section
            if current_section and content_buffer:
                if current_section not in sections:
                    sections[current_section] = {}
                sections[current_section][current_subsection or 'intro'] = content_buffer
            
            current_section = main_match.group(2).strip()
            current_subsection = None
            content_buffer = []
            continue
        
        # Check for subsections (1.1, 1.2, etc.)
        sub_match = re.match(r'^(\d+\.\d+)\s+(.+)$', line)
        if sub_match:
            # Save previous subsection
            if current_section and content_buffer:
                if current_section not in sections:
                    sections[current_section] = {}
                sections[current_section][current_subsection or 'intro'] = content_buffer
            
            current_subsection = sub_match.group(2).strip()
            content_buffer = []
            continue
        
        # Regular content
        if line:
            content_buffer.append(line)
    
    # Save last section
    if current_section and content_buffer:
        if current_section not in sections:
            sections[current_section] = {}
        sections[current_section][current_subsection or 'intro'] = content_buffer
    
    return sections

def format_content_as_html(content_list):
    """Convert list of content lines to formatted HTML"""
    html_content = []
    current_list = []
    in_list = False
    
    for line in content_list:
        line = clean_text(line)
        
        # Check if this is a bullet point
        if line.startswith('•') or line.startswith('–'):
            if not in_list:
                in_list = True
                current_list = []
            # Clean bullet point
            clean_line = line.lstrip('•–').strip()
            current_list.append(f'<li>{html.escape(clean_line)}</li>')
        else:
            # If we were in a list, close it
            if in_list:
                html_content.append('<ul>')
                html_content.extend(current_list)
                html_content.append('</ul>')
                in_list = False
                current_list = []
            
            # Regular paragraph or special formatting
            if line:
                # Check for equations or formulas
                if any(char in line for char in ['=', '∝', '√', '²', '₀', '₁', '₂']):
                    html_content.append(f'<div class="equation">{html.escape(line)}</div>')
                else:
                    html_content.append(f'<p>{html.escape(line)}</p>')
    
    # Close any remaining list
    if in_list:
        html_content.append('<ul>')
        html_content.extend(current_list)
        html_content.append('</ul>')
    
    return '\n'.join(html_content)

def create_section_id(title):
    """Create URL-safe section ID"""
    return re.sub(r'[^a-zA-Z0-9]+', '-', title.lower()).strip('-')

def generate_complete_factsheet():
    """Generate complete HTML fact sheet"""
    sections_data = parse_factsheet_content()
    
    print(f"Parsed {len(sections_data)} main sections:")
    for section_name, subsections in sections_data.items():
        print(f"  {section_name}: {len(subsections)} subsections")
    
    # Generate HTML content for each section
    html_sections = []
    
    for section_name, subsections in sections_data.items():
        section_id = create_section_id(section_name)
        
        html_sections.append(f'<section id="{section_id}" class="section">')
        html_sections.append(f'  <h1>{html.escape(section_name)}</h1>')
        
        for subsection_name, content in subsections.items():
            if subsection_name != 'intro':
                subsection_id = create_section_id(f"{section_name}-{subsection_name}")
                html_sections.append(f'  <section id="{subsection_id}">')
                html_sections.append(f'    <h2>{html.escape(subsection_name)}</h2>')
                html_sections.append(f'    {format_content_as_html(content)}')
                html_sections.append(f'  </section>')
            else:
                # Intro content directly under main section
                if content:
                    html_sections.append(f'  {format_content_as_html(content)}')
        
        html_sections.append('</section>')
    
    return '\n'.join(html_sections)

if __name__ == "__main__":
    try:
        section_html = generate_complete_factsheet()
        
        with open('factsheet_sections.html', 'w', encoding='utf-8') as f:
            f.write(section_html)
        
        print("\\nFactsheet sections generated successfully!")
        print("Output saved to: factsheet_sections.html")
        
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()