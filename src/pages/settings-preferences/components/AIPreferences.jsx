import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIPreferences = () => {
  const [aiSettings, setAiSettings] = useState({
    categorizationSensitivity: 75,
    priorityAlgorithm: "balanced",
    suggestionFrequency: "moderate",
    nlpAccuracy: "high",
    autoTagging: true,
    smartScheduling: true,
    contextAwareness: true,
    learningMode: true,
    voiceProcessing: true,
    predictiveText: true,
    workflowOptimization: true,
    focusMode: false
  });

  const [customPrompts, setCustomPrompts] = useState([
    { id: 1, name: "Daily Planning", prompt: "Help me organize my day based on priorities and energy levels", active: true },
    { id: 2, name: "Project Breakdown", prompt: "Break down complex projects into manageable tasks", active: true },
    { id: 3, name: "Time Estimation", prompt: "Estimate realistic time requirements for tasks", active: false }
  ]);

  const handleSliderChange = (setting, value) => {
    setAiSettings(prev => ({ ...prev, [setting]: value }));
  };

  const handleToggleChange = (setting) => {
    setAiSettings(prev => ({ ...prev, [setting]: !prev[setting] }));
  };

  const handlePromptToggle = (promptId) => {
    setCustomPrompts(prev => 
      prev.map(prompt => 
        prompt.id === promptId ? { ...prompt, active: !prompt.active } : prompt
      )
    );
  };

  const resetToDefaults = () => {
    setAiSettings({
      categorizationSensitivity: 75,
      priorityAlgorithm: "balanced",
      suggestionFrequency: "moderate",
      nlpAccuracy: "high",
      autoTagging: true,
      smartScheduling: true,
      contextAwareness: true,
      learningMode: true,
      voiceProcessing: true,
      predictiveText: true,
      workflowOptimization: true,
      focusMode: false
    });
  };

  return (
    <div className="space-y-6">
      {/* AI Intelligence Settings */}
      <div className="bg-surface rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">AI Intelligence Settings</h3>
            <p className="text-sm text-text-secondary mt-1">Fine-tune how AI analyzes and processes your tasks</p>
          </div>
          <Button variant="ghost" iconName="RotateCcw" onClick={resetToDefaults}>
            Reset Defaults
          </Button>
        </div>

        <div className="space-y-6">
          {/* Categorization Sensitivity */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-text-primary">Categorization Sensitivity</label>
              <span className="text-sm text-text-secondary">{aiSettings.categorizationSensitivity}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={aiSettings.categorizationSensitivity}
              onChange={(e) => handleSliderChange('categorizationSensitivity', parseInt(e.target.value))}
              className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-text-muted mt-1">
              <span>Conservative</span>
              <span>Aggressive</span>
            </div>
          </div>

          {/* Priority Algorithm */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">Priority Algorithm</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {['deadline-focused', 'balanced', 'impact-driven'].map((algorithm) => (
                <button
                  key={algorithm}
                  onClick={() => handleSliderChange('priorityAlgorithm', algorithm)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    aiSettings.priorityAlgorithm === algorithm
                      ? 'border-primary bg-primary-50 text-primary' :'border-border bg-surface text-text-secondary hover:border-primary-200'
                  }`}
                >
                  <div className="text-sm font-medium capitalize">{algorithm.replace('-', ' ')}</div>
                  <div className="text-xs mt-1">
                    {algorithm === 'deadline-focused' && 'Prioritizes urgent deadlines'}
                    {algorithm === 'balanced' && 'Balances urgency and importance'}
                    {algorithm === 'impact-driven' && 'Focuses on high-impact tasks'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Suggestion Frequency */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">AI Suggestion Frequency</label>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {['minimal', 'moderate', 'frequent', 'continuous'].map((frequency) => (
                <button
                  key={frequency}
                  onClick={() => handleSliderChange('suggestionFrequency', frequency)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    aiSettings.suggestionFrequency === frequency
                      ? 'border-primary bg-primary-50 text-primary' :'border-border bg-surface text-text-secondary hover:border-primary-200'
                  }`}
                >
                  <div className="text-sm font-medium capitalize">{frequency}</div>
                </button>
              ))}
            </div>
          </div>

          {/* NLP Accuracy */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">Natural Language Processing</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {['basic', 'standard', 'high'].map((accuracy) => (
                <button
                  key={accuracy}
                  onClick={() => handleSliderChange('nlpAccuracy', accuracy)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    aiSettings.nlpAccuracy === accuracy
                      ? 'border-primary bg-primary-50 text-primary' :'border-border bg-surface text-text-secondary hover:border-primary-200'
                  }`}
                >
                  <div className="text-sm font-medium capitalize">{accuracy}</div>
                  <div className="text-xs mt-1">
                    {accuracy === 'basic' && 'Simple keyword detection'}
                    {accuracy === 'standard' && 'Context-aware processing'}
                    {accuracy === 'high' && 'Advanced semantic understanding'}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Feature Toggles */}
      <div className="bg-surface rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-6">AI Features</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { key: 'autoTagging', label: 'Auto-Tagging', description: 'Automatically categorize and tag tasks' },
            { key: 'smartScheduling', label: 'Smart Scheduling', description: 'AI-powered optimal time slot suggestions' },
            { key: 'contextAwareness', label: 'Context Awareness', description: 'Consider location and time for suggestions' },
            { key: 'learningMode', label: 'Learning Mode', description: 'Improve AI based on your preferences' },
            { key: 'voiceProcessing', label: 'Voice Processing', description: 'Convert speech to tasks accurately' },
            { key: 'predictiveText', label: 'Predictive Text', description: 'Smart autocomplete for task descriptions' },
            { key: 'workflowOptimization', label: 'Workflow Optimization', description: 'Suggest process improvements' },
            { key: 'focusMode', label: 'AI Focus Mode', description: 'Block distractions during work sessions' }
          ].map((feature) => (
            <div key={feature.key} className="flex items-start space-x-4 p-4 rounded-lg border border-border">
              <button
                onClick={() => handleToggleChange(feature.key)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  aiSettings[feature.key] ? 'bg-primary' : 'bg-secondary-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    aiSettings[feature.key] ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-text-primary">{feature.label}</h4>
                <p className="text-xs text-text-secondary mt-1">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom AI Prompts */}
      <div className="bg-surface rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Custom AI Prompts</h3>
            <p className="text-sm text-text-secondary mt-1">Personalize AI responses with custom prompts</p>
          </div>
          <Button variant="outline" iconName="Plus">
            Add Prompt
          </Button>
        </div>

        <div className="space-y-4">
          {customPrompts.map((prompt) => (
            <div key={prompt.id} className="flex items-start space-x-4 p-4 rounded-lg border border-border">
              <button
                onClick={() => handlePromptToggle(prompt.id)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  prompt.active ? 'bg-primary' : 'bg-secondary-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    prompt.active ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-text-primary">{prompt.name}</h4>
                <p className="text-xs text-text-secondary mt-1">{prompt.prompt}</p>
              </div>
              <div className="flex space-x-2">
                <button className="p-1 rounded-md hover:bg-secondary-100 transition-colors">
                  <Icon name="Edit" size={16} className="text-text-muted" />
                </button>
                <button className="p-1 rounded-md hover:bg-error-50 transition-colors">
                  <Icon name="Trash2" size={16} className="text-error" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Performance Metrics */}
      <div className="bg-surface rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-6">AI Performance</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-primary-50 rounded-lg">
            <div className="text-2xl font-bold text-primary">94%</div>
            <div className="text-sm text-primary-600">Categorization Accuracy</div>
          </div>
          <div className="text-center p-4 bg-success-50 rounded-lg">
            <div className="text-2xl font-bold text-success">87%</div>
            <div className="text-sm text-success-600">Priority Prediction</div>
          </div>
          <div className="text-center p-4 bg-accent-50 rounded-lg">
            <div className="text-2xl font-bold text-accent">156</div>
            <div className="text-sm text-accent-600">Tasks Optimized</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPreferences;
