
import React, { useState, useEffect, useCallback } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getMockProblems } from '../../services/api';
import { analyzeProblems } from '../../services/geminiService';
import type { Group, Problem, AnalysisResult } from '../../types';
import Spinner from '../ui/Spinner';
import Card from '../ui/Card';

interface ProblemAnalysisProps {
  areaGroup: Group;
}

const ProblemAnalysis: React.FC<ProblemAnalysisProps> = ({ areaGroup }) => {
  const [analysis, setAnalysis] = useState<AnalysisResult[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const runAnalysis = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const problems: Problem[] = await getMockProblems(areaGroup.id);
      if (problems.length === 0) {
        setAnalysis([]);
        setLoading(false);
        return;
      }
      const problemContent = problems.map(p => p.content);
      const result = await analyzeProblems(problemContent, areaGroup.name);
      
      if(result) {
        // Sort results by count descending for the chart
        result.sort((a, b) => b.count - a.count);
        setAnalysis(result);
      } else {
        setError("Failed to get analysis from the AI service.");
      }
      
    } catch (err) {
      setError("An error occurred while analyzing problems.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [areaGroup.id, areaGroup.name]);

  useEffect(() => {
    runAnalysis();
  }, [runAnalysis]);

  if (loading) {
    return (
      <Card className="flex flex-col items-center justify-center h-96">
        <Spinner />
        <p className="mt-4 text-slate-600">Analyzing community problems with AI...</p>
      </Card>
    );
  }

  if (error) {
    return <Card><p className="text-red-500">{error}</p></Card>;
  }
  
  if (!analysis || analysis.length === 0) {
    return <Card><p className="text-slate-600">No problems reported in this area yet, or no significant trends found.</p></Card>
  }

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Top Issues in {areaGroup.name}</h2>
        <p className="text-slate-600 mb-6">Here is an AI-powered summary of the most frequently reported issues by the community members.</p>
        <div className="h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analysis} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="issue" />
                    <YAxis allowDecimals={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd' }}/>
                    <Legend />
                    <Bar dataKey="count" fill="#F97316" name="Number of Reports" />
                </BarChart>
            </ResponsiveContainer>
        </div>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {analysis.map((item, index) => (
            <Card key={index} className="flex flex-col">
                <div className="flex items-center mb-3">
                    <span className="bg-orange-500 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold text-lg mr-3">{item.count}</span>
                    <h3 className="text-lg font-semibold text-slate-800">{item.issue}</h3>
                </div>
                <p className="text-slate-600 flex-grow">{item.summary}</p>
                <button className="mt-4 text-sm font-semibold text-orange-600 hover:underline self-start">View Related Reports</button>
            </Card>
        ))}
      </div>
    </div>
  );
};

export default ProblemAnalysis;
