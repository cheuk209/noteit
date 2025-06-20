#!/bin/bash

# Create subdirectories with numbering directly in the root directory
mkdir -p 1_Journey
mkdir -p 2_Resources
mkdir -p 2_Resources
mkdir -p 2_Resources
mkdir -p 3_Encounters
mkdir -p 3_Encounters
mkdir -p 3_Encounters
mkdir -p 4_Milestones
mkdir -p 5_Debrief
# Create README.md with sections in the root directory
cat <<EOL > README.md
# Academy

## 1. Journey 🌌
This directory is your personal log of the learning journey. Here, you will document your experiences, thoughts, and reflections as you progress through your missions. It's a space for introspection and storytelling.

## 2. Resources 📚
The Resources directory contains all the data, scripts, and code you create or use during your learning process. It's your toolkit for exploration and experimentation.

Any datasets you use or generate.

Code snippets, scripts, and programs.

### Documentation
Manuals, guides, and other reference materials.

## 3. Encounters 🛠️
In the Encounters directory, you will document any errors, setbacks, and challenges you face. This section is crucial for learning from mistakes and finding solutions to problems.

### Errors
Logs and descriptions of errors encountered.

### Debugging
Steps taken to troubleshoot and resolve issues.

## 4. Milestones 🏆
The Milestones directory is where you capture important achievements and states. Use this section to store screenshots and descriptions of significant progress points.

### Screenshots
Visual captures of key moments.

### Visualisations  
Use Excalidraw to aid in viusalisation of problems/Concepts

## 5. Debrief
Use AI to generate summary, takeaways, and also questions from your own notes, for spaced repetition!
EOL

echo "Directory structure created successfully!"