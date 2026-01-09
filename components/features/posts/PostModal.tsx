
import React, { useState, useEffect } from 'react';
import { Post } from '../../../types/index';
import { X } from 'lucide-react';

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (post: Partial<Post>) => void;
  initialData?: Post | null;
  isLoading?: boolean;
}

const PostModal: React.FC<PostModalProps> = ({ isOpen, onClose, onSubmit, initialData, isLoading }) => {
  const [formData, setFormData] = useState<Partial<Post>>({
    title: '',
    body: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        body: initialData.body,
      });
    } else {
      setFormData({ title: '', body: '' });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center md:items-center justify-center p-0 md:p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="bg-slate-900 md:bg-white rounded-t-[40px] md:rounded-[40px] w-full max-w-lg relative z-10 shadow-2xl overflow-hidden animate-in slide-in-from-bottom md:zoom-in duration-500 h-[90vh] md:h-auto flex flex-col mt-auto md:mt-0">
        
        {/* Mobile Handle */}
        <div className="md:hidden flex justify-center py-4">
          <div className="w-12 h-1.5 bg-slate-700 rounded-full opacity-50"></div>
        </div>

        <div className="px-6 pb-6 md:pt-8 md:px-8 flex justify-between items-center border-b border-white/5 md:border-slate-100">
          <h2 className="text-2xl font-black text-white md:text-slate-900 tracking-tight">
            {initialData ? 'Refine Entry' : 'New Article'}
          </h2>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-200 md:hover:text-slate-600 bg-slate-800 md:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="p-6 md:p-8 space-y-6 flex-1 overflow-y-auto">
          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">Heading</label>
            <input
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Give it a catchy name..."
              className="w-full px-5 py-4 bg-slate-800/50 md:bg-slate-50 border border-white/5 md:border-slate-200 rounded-[24px] text-white md:text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-600"
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">Content Body</label>
            <textarea
              required
              rows={8}
              value={formData.body}
              onChange={(e) => setFormData({ ...formData, body: e.target.value })}
              placeholder="Craft your narrative here..."
              className="w-full px-5 py-4 bg-slate-800/50 md:bg-slate-50 border border-white/5 md:border-slate-200 rounded-[24px] text-white md:text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none placeholder:text-slate-600"
            />
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 pt-4 pb-12 md:pb-0">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full md:flex-1 order-1 md:order-2 px-6 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-[24px] hover:shadow-xl hover:shadow-indigo-500/20 transition-all active:scale-95 disabled:opacity-50"
            >
              {isLoading ? 'Publishing...' : initialData ? 'Save Changes' : 'Publish Article'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full md:flex-1 order-2 md:order-1 px-6 py-5 border border-white/10 md:border-slate-200 text-slate-400 md:text-slate-600 font-bold rounded-[24px] hover:bg-slate-800 md:hover:bg-slate-50 transition-colors"
            >
              Discard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostModal;
