import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';

interface GitCommand {
  command: string;
  description: string;
  category: string;
}

const gitCommands: GitCommand[] = [
  // Getting Started
  { command: 'git init', description: 'Initialize a new repository', category: 'Getting Started' },
  { command: 'git clone <url>', description: 'Clone a repository', category: 'Getting Started' },
  { command: 'git config --global user.name "Name"', description: 'Set global username', category: 'Getting Started' },
  { command: 'git config --global user.email "email"', description: 'Set global email', category: 'Getting Started' },
  
  // Basic Commands
  { command: 'git add <file>', description: 'Stage a file for commit', category: 'Basic Commands' },
  { command: 'git add .', description: 'Stage all files', category: 'Basic Commands' },
  { command: 'git commit -m "message"', description: 'Commit staged changes', category: 'Basic Commands' },
  { command: 'git status', description: 'Show repository status', category: 'Basic Commands' },
  { command: 'git log', description: 'Show commit history', category: 'Basic Commands' },
  { command: 'git log --oneline', description: 'Show compact commit history', category: 'Basic Commands' },
  
  // Branching
  { command: 'git branch', description: 'List all branches', category: 'Branching' },
  { command: 'git branch <name>', description: 'Create a new branch', category: 'Branching' },
  { command: 'git checkout <branch>', description: 'Switch to a branch', category: 'Branching' },
  { command: 'git checkout -b <name>', description: 'Create and switch to new branch', category: 'Branching' },
  { command: 'git merge <branch>', description: 'Merge branch into current', category: 'Branching' },
  { command: 'git branch -d <branch>', description: 'Delete a branch', category: 'Branching' },
  
  // Remote Operations
  { command: 'git remote add origin <url>', description: 'Add remote repository', category: 'Remote Operations' },
  { command: 'git push origin <branch>', description: 'Push to remote repository', category: 'Remote Operations' },
  { command: 'git pull origin <branch>', description: 'Pull from remote repository', category: 'Remote Operations' },
  { command: 'git fetch', description: 'Download objects from remote', category: 'Remote Operations' },
  { command: 'git remote -v', description: 'List remote repositories', category: 'Remote Operations' },
  
  // Undoing Changes
  { command: 'git reset HEAD <file>', description: 'Unstage a file', category: 'Undoing Changes' },
  { command: 'git checkout -- <file>', description: 'Discard changes in working directory', category: 'Undoing Changes' },
  { command: 'git revert <commit>', description: 'Create new commit that undoes changes', category: 'Undoing Changes' },
  { command: 'git reset --hard HEAD', description: 'Reset to last commit (dangerous)', category: 'Undoing Changes' },
  { command: 'git reset --soft HEAD~1', description: 'Undo last commit, keep changes staged', category: 'Undoing Changes' },
  
  // Information
  { command: 'git diff', description: 'Show unstaged changes', category: 'Information' },
  { command: 'git diff --staged', description: 'Show staged changes', category: 'Information' },
  { command: 'git show <commit>', description: 'Show commit details', category: 'Information' },
  { command: 'git blame <file>', description: 'Show who changed what in a file', category: 'Information' },
  { command: 'git log --graph --oneline', description: 'Show commit graph', category: 'Information' },
  
  // Stashing
  { command: 'git stash', description: 'Stash current changes', category: 'Stashing' },
  { command: 'git stash list', description: 'List all stashes', category: 'Stashing' },
  { command: 'git stash pop', description: 'Apply and remove latest stash', category: 'Stashing' },
  { command: 'git stash apply', description: 'Apply latest stash (keep it)', category: 'Stashing' },
  { command: 'git stash drop', description: 'Remove latest stash', category: 'Stashing' },
  
  // Tags
  { command: 'git tag <name>', description: 'Create a lightweight tag', category: 'Tags' },
  { command: 'git tag -a <name> -m "message"', description: 'Create an annotated tag', category: 'Tags' },
  { command: 'git tag', description: 'List all tags', category: 'Tags' },
  { command: 'git push origin --tags', description: 'Push all tags to remote', category: 'Tags' },
];

const categories = [...new Set(gitCommands.map(cmd => cmd.category))];

export default function GitCheatsheetScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const copyToClipboard = (command: string) => {
    // In a real app, you'd use Clipboard API
    setCopiedCommand(command);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  const filteredCommands = selectedCategory 
    ? gitCommands.filter(cmd => cmd.category === selectedCategory)
    : gitCommands;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Git Cheatsheet</Text>
      
      <View style={styles.categoryContainer}>
        <Text style={styles.label}>Categories:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
          <TouchableOpacity
            style={[styles.categoryButton, !selectedCategory && styles.activeCategory]}
            onPress={() => setSelectedCategory(null)}
          >
            <Text style={[styles.categoryText, !selectedCategory && styles.activeCategoryText]}>
              All
            </Text>
          </TouchableOpacity>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[styles.categoryButton, selectedCategory === category && styles.activeCategory]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[styles.categoryText, selectedCategory === category && styles.activeCategoryText]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.commandsContainer}>
        {filteredCommands.map((cmd, index) => (
          <View key={index} style={styles.commandCard}>
            <View style={styles.commandHeader}>
              <Text style={styles.commandText}>{cmd.command}</Text>
              <TouchableOpacity
                style={styles.copyButton}
                onPress={() => copyToClipboard(cmd.command)}
              >
                <Text style={styles.copyButtonText}>
                  {copiedCommand === cmd.command ? 'Copied!' : 'Copy'}
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.descriptionText}>{cmd.description}</Text>
            <Text style={styles.categoryLabel}>{cmd.category}</Text>
          </View>
        ))}
      </View>

      <View style={styles.tipsContainer}>
        <Text style={styles.tipsTitle}>💡 Pro Tips:</Text>
        <Text style={styles.tipText}>• Use 'git log --oneline' for compact history</Text>
        <Text style={styles.tipText}>• 'git status' before committing to check what's staged</Text>
        <Text style={styles.tipText}>• Use 'git stash' to temporarily save work</Text>
        <Text style={styles.tipText}>• 'git diff --staged' to see what will be committed</Text>
        <Text style={styles.tipText}>• Use meaningful commit messages</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  categoryContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  categoriesScroll: {
    marginTop: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 8,
  },
  activeCategory: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
  },
  activeCategoryText: {
    color: '#fff',
  },
  commandsContainer: {
    marginBottom: 20,
  },
  commandCard: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  commandHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  commandText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'monospace',
    flex: 1,
    marginRight: 8,
  },
  copyButton: {
    backgroundColor: '#28a745',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
  },
  copyButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  categoryLabel: {
    fontSize: 12,
    color: '#2196F3',
    fontWeight: '500',
  },
  tipsContainer: {
    backgroundColor: '#e3f2fd',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    marginBottom: 4,
    color: '#1976d2',
  },
});
