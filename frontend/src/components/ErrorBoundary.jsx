import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-screen flex items-center justify-center bg-slate-900">
          <div className="max-w-2xl p-8 bg-slate-800 rounded-lg border border-red-500/20">
            <h1 className="text-2xl font-bold text-red-400 mb-4">
              3D Rendering Error
            </h1>
            <p className="text-slate-300 mb-4">
              The 3D scene encountered an error. This might be due to:
            </p>
            <ul className="list-disc list-inside text-slate-400 space-y-2 mb-6">
              <li>WebGL not being properly supported in your browser</li>
              <li>Graphics driver issues</li>
              <li>Hardware acceleration being disabled</li>
            </ul>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg 
                       transition-colors"
            >
              Reload Page
            </button>
            {this.props.showDetails && (
              <details className="mt-6">
                <summary className="text-slate-400 cursor-pointer hover:text-slate-300">
                  Technical Details
                </summary>
                <pre className="mt-2 p-4 bg-slate-900 rounded text-xs text-red-300 overflow-auto">
                  {this.state.error?.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
