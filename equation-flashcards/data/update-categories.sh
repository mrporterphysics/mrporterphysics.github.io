#!/bin/bash
# Update categories in CSV to match unit structure

cd "$(dirname "$0")"

# Backup original
cp regents-equations.csv regents-equations.csv.backup

# Update categories using sed
sed -i '' '2,8s/,mechanics,/,kinematics,/' regents-equations.csv  # Lines 2-8: kinematics
sed -i '' '9,12s/,mechanics,/,forces,/' regents-equations.csv     # Lines 9-12: forces
sed-i '' '13,15s/,mechanics,/,momentum,/' regents-equations.csv   # Lines 13-15: momentum
sed -i '' '25,27s/,electricity,/,static-electricity,/' regents-equations.csv  # Lines 25-27: static electricity
sed -i '' '28,38s/,electricity,/,circuits,/' regents-equations.csv  # Lines 28-38: circuits
sed -i '' '39,44s/,waves,/,waves-light,/' regents-equations.csv  # Lines 39-44: waves & light

echo "Categories updated!"
echo "Backup saved as regents-equations.csv.backup"
