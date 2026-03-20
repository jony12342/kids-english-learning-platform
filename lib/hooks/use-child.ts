// Hook for managing current child context
import { useState, useEffect } from 'react';
import { getChildByIdClient } from '@/lib/supabase/client-queries';

export function useChild() {
  const [childId, setChildId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [child, setChild] = useState<any>(null);

  useEffect(() => {
    // For now, use a mock child ID
    // In production, this would come from authentication/session
    const mockChildId = '00000000-0000-0000-0000-000000000001';
    setChildId(mockChildId);
    setLoading(false);

    // Load child data
    loadChild(mockChildId);
  }, []);

  async function loadChild(id: string) {
    const childData = await getChildByIdClient(id);
    setChild(childData);
  }

  return {
    childId,
    child,
    loading,
    setChildId: (id: string) => {
      setChildId(id);
      loadChild(id);
    }
  };
}
