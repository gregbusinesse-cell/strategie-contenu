import { supabase } from './supabase';

// ===== IDEES TABLE =====

export const fetchIdeasFromSupabase = async () => {
  try {
    const { data, error } = await supabase
      .from('idees')
      .select('*')
      .order('id', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error('Erreur fetch idees from Supabase:', err);
    return [];
  }
};

export const saveIdeaToSupabase = async (idea) => {
  try {
    if (!idea) return false;

    if (idea.id) {
      // Update existing
      const { error } = await supabase
        .from('idees')
        .update({
          titre: idea.titre || '',
          description: idea.description || '',
          type: idea.type || 'Idée générale',
          typecontenu: idea.typeContenu || idea.typecontenu || '',
          duree: idea.duree || '',
          images: idea.images || [],
          notes: idea.notes || '',
          updated_at: new Date().toISOString()
        })
        .eq('id', idea.id);

      if (error) throw error;
      console.log(`Idea ${idea.id} updated in Supabase`);
      return true;
    } else {
      // Insert new
      const { data, error } = await supabase
        .from('idees')
        .insert({
          titre: idea.titre || '',
          description: idea.description || '',
          type: idea.type || 'Idée générale',
          typecontenu: idea.typeContenu || idea.typecontenu || '',
          duree: idea.duree || '',
          images: idea.images || [],
          notes: idea.notes || ''
        })
        .select();

      if (error) throw error;
      if (data && data[0]) {
        idea.id = data[0].id;
      }
      console.log('New idea inserted in Supabase', data);
      return true;
    }
  } catch (err) {
    console.error('Erreur save idea:', err);
    return false;
  }
};

export const deleteIdeaFromSupabase = async (id) => {
  try {
    const { error } = await supabase
      .from('idees')
      .delete()
      .eq('id', id);

    if (error) throw error;
    console.log(`Idea ${id} deleted from Supabase`);
    return true;
  } catch (err) {
    console.error('Erreur delete idea:', err);
    return false;
  }
};

export const syncAllIdeas = async (localIdeas) => {
  try {
    console.log('Syncing all ideas...');
    let saved = 0;
    let errors = 0;

    for (const idea of localIdeas) {
      const success = await saveIdeaToSupabase(idea);
      if (success) saved++;
      else errors++;
    }

    console.log(`Sync complete: ${saved} ideas saved, ${errors} errors`);
    return errors === 0;
  } catch (err) {
    console.error('Erreur sync ideas:', err);
    return false;
  }
};

// ===== FINANCES TABLE =====

export const fetchFinancesFromSupabase = async () => {
  try {
    const { data, error } = await supabase
      .from('finances')
      .select('*')
      .order('id', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error('Erreur fetch finances from Supabase:', err);
    return [];
  }
};

export const saveFinanceToSupabase = async (finance) => {
  try {
    if (!finance) return false;

    if (finance.id) {
      // Update existing
      const { error } = await supabase
        .from('finances')
        .update({
          article: finance.article || finance.produit || '',
          quantite: finance.quantite || '',
          prixunitaire: finance.prixunitaire || finance.prixUnitaire || '',
          statut: finance.statut || 'À commander',
          fournisseur: finance.fournisseur || '',
          lien: finance.lien || '',
          notes: finance.notes || '',
          mois: finance.mois || 'juillet',
          updated_at: new Date().toISOString()
        })
        .eq('id', finance.id);

      if (error) throw error;
      console.log(`Finance ${finance.id} updated in Supabase`);
      return true;
    } else {
      // Insert new
      const { data, error } = await supabase
        .from('finances')
        .insert({
          article: finance.article || finance.produit || '',
          quantite: finance.quantite || '',
          prixunitaire: finance.prixunitaire || finance.prixUnitaire || '',
          statut: finance.statut || 'À commander',
          fournisseur: finance.fournisseur || '',
          lien: finance.lien || '',
          notes: finance.notes || '',
          mois: finance.mois || 'juillet'
        })
        .select();

      if (error) throw error;
      if (data && data[0]) {
        finance.id = data[0].id;
      }
      console.log('New finance item inserted in Supabase', data);
      return true;
    }
  } catch (err) {
    console.error('Erreur save finance:', err);
    return false;
  }
};

export const deleteFinanceFromSupabase = async (id) => {
  try {
    const { error } = await supabase
      .from('finances')
      .delete()
      .eq('id', id);

    if (error) throw error;
    console.log(`Finance ${id} deleted from Supabase`);
    return true;
  } catch (err) {
    console.error('Erreur delete finance:', err);
    return false;
  }
};

export const syncAllFinances = async (localFinances) => {
  try {
    console.log('Syncing all finances...');
    let saved = 0;
    let errors = 0;

    for (const finance of localFinances) {
      const success = await saveFinanceToSupabase(finance);
      if (success) saved++;
      else errors++;
    }

    console.log(`Sync complete: ${saved} finances saved, ${errors} errors`);
    return errors === 0;
  } catch (err) {
    console.error('Erreur sync finances:', err);
    return false;
  }
};

// ===== VIDEOS_YOUTUBE TABLE =====

export const fetchVideosFromSupabase = async () => {
  try {
    const { data, error } = await supabase
      .from('videos_youtube')
      .select('*')
      .order('id', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error('Erreur fetch videos from Supabase:', err);
    return [];
  }
};

export const saveVideoToSupabase = async (video) => {
  try {
    if (!video) return false;

    if (video.id) {
      // Update existing
      const { error } = await supabase
        .from('videos_youtube')
        .update({
          date: video.date || new Date().toISOString().split('T')[0],
          statut: video.statut || 'À faire',
          titre: video.titre || '',
          miniature: video.miniature || '',
          description: video.description || '',
          updated_at: new Date().toISOString()
        })
        .eq('id', video.id);

      if (error) throw error;
      console.log(`Video ${video.id} updated in Supabase`);
      return true;
    } else {
      // Insert new
      const { error } = await supabase
        .from('videos_youtube')
        .insert({
          date: video.date || new Date().toISOString().split('T')[0],
          statut: video.statut || 'À faire',
          titre: video.titre || '',
          miniature: video.miniature || '',
          description: video.description || ''
        });

      if (error) throw error;
      console.log('New video inserted in Supabase');
      return true;
    }
  } catch (err) {
    console.error('Erreur save video:', err);
    return false;
  }
};

export const deleteVideoFromSupabase = async (id) => {
  try {
    const { error } = await supabase
      .from('videos_youtube')
      .delete()
      .eq('id', id);

    if (error) throw error;
    console.log(`Video ${id} deleted from Supabase`);
    return true;
  } catch (err) {
    console.error('Erreur delete video:', err);
    return false;
  }
};

export const syncAllVideos = async (localVideos) => {
  try {
    console.log('Syncing all videos...');
    let saved = 0;
    let errors = 0;

    for (const video of localVideos) {
      const success = await saveVideoToSupabase(video);
      if (success) saved++;
      else errors++;
    }

    console.log(`Sync complete: ${saved} videos saved, ${errors} errors`);
    return errors === 0;
  } catch (err) {
    console.error('Erreur sync videos:', err);
    return false;
  }
};
