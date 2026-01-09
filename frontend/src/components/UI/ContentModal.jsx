import { useEffect } from 'react';
import useGameStore from '../../store/gameStore';
import { X, ExternalLink } from 'lucide-react';

const ContentModal = () => {
  const { activeContent, closeContent } = useGameStore();

  useEffect(() => {
    // Close modal with ESC key
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeContent();
      }
    };

    if (activeContent) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => window.removeEventListener('keydown', handleEscape);
  }, [activeContent, closeContent]);

  if (!activeContent) return null;

  const renderContent = () => {
    const { type, data, title, description } = activeContent;

    switch (type) {
      case 'project':
        return (
          <div className="space-y-4">
            <img 
              src={data.image} 
              alt={title}
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="space-y-2">
              <p className="text-slate-300">{description}</p>
              <div className="flex flex-wrap gap-2">
                {data.technologies.map((tech, i) => (
                  <span 
                    key={i}
                    className="px-3 py-1 bg-slate-700/50 rounded-full text-sm text-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              {data.link && (
                <a
                  href={data.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 
                           text-white rounded-lg transition-colors"
                >
                  View Project <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        );

      case 'bio':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <img 
                src={data.avatar} 
                alt={data.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div>
                <h3 className="text-2xl font-bold text-white">{data.name}</h3>
                <p className="text-slate-400">{data.title}</p>
              </div>
            </div>
            <p className="text-slate-300">{data.bio}</p>
            <p className="text-lg font-semibold text-blue-400">{data.tagline}</p>
          </div>
        );

      case 'social':
        return (
          <div className="space-y-4">
            <p className="text-slate-300">{description}</p>
            <a
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-400
                       text-white font-semibold rounded-lg hover:shadow-lg transition-all"
            >
              Connect on {title} <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        );

      default:
        return <p className="text-slate-300">{description}</p>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-slate-900/95 backdrop-blur-md rounded-2xl 
                    border border-slate-700 shadow-2xl max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 flex justify-between items-start p-6 border-b border-slate-700 
                      bg-slate-900/95 backdrop-blur-sm">
          <div>
            <h2 className="text-3xl font-bold text-white">{activeContent.title}</h2>
            <p className="text-sm text-slate-400 mt-1">{activeContent.type}</p>
          </div>
          <button
            onClick={closeContent}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {renderContent()}
        </div>

        {/* Footer hint */}
        <div className="p-4 text-center text-sm text-slate-500 border-t border-slate-700">
          Press <kbd className="px-2 py-1 bg-slate-800 rounded">ESC</kbd> to close
        </div>
      </div>
    </div>
  );
};

export default ContentModal;
