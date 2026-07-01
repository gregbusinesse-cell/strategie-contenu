import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Fetch all plan data from Supabase - SOURCE OF TRUTH
export const fetchPlanFromSupabase = async () => {
  try {
    const { data, error } = await supabase
      .from('plan')
      .select('*')
      .order('day_number', { ascending: true });

    if (error) throw error;

    // Convert to object format {day_number: {...}}
    const planObj = {};
    if (data && data.length > 0) {
      data.forEach(item => {
        planObj[item.day_number] = {
          title: item.title || '',
          description: item.description || '',
          completed: item.completed || false,
          id: item.id,
          updated_at: item.updated_at
        };
      });
    }
    console.log('✓ Loaded from Supabase:', Object.keys(planObj).length, 'days');
    return planObj;
  } catch (err) {
    console.error('Erreur fetch plan from Supabase:', err);
    return {};
  }
};

// Save individual day to Supabase - ATOMIC SAVE
export const savePlanToSupabase = async (dayNumber, dayData) => {
  try {
    if (!dayNumber || !dayData) return false;

    const dayNum = parseInt(dayNumber);

    // Check if record exists
    const { data: existing, error: checkError } = await supabase
      .from('plan')
      .select('id')
      .eq('day_number', dayNum)
      .maybeSingle();

    if (existing && existing.id) {
      // Update existing
      const { error: updateError } = await supabase
        .from('plan')
        .update({
          title: dayData.title || '',
          description: dayData.description || '',
          completed: dayData.completed || false,
          updated_at: new Date().toISOString()
        })
        .eq('day_number', dayNum);

      if (updateError) throw updateError;
      console.log(`✓ Day ${dayNum} updated in Supabase`);
      return true;
    } else {
      // Insert new
      const { error: insertError } = await supabase
        .from('plan')
        .insert({
          day_number: dayNum,
          title: dayData.title || '',
          description: dayData.description || '',
          completed: dayData.completed || false
        });

      if (insertError) throw insertError;
      console.log(`✓ Day ${dayNum} inserted in Supabase`);
      return true;
    }
  } catch (err) {
    console.error(`Erreur save day ${dayNumber}:`, err);
    return false;
  }
};

// Full sync - push ALL local changes to Supabase
export const syncAllPlanData = async (localPlanData) => {
  try {
    console.log('🔄 SYNCHRONISATION EN COURS...');
    let saved = 0;
    let errors = 0;

    for (const [dayNum, dayData] of Object.entries(localPlanData)) {
      const success = await savePlanToSupabase(parseInt(dayNum), dayData);
      if (success) saved++;
      else errors++;
    }

    const status = errors === 0 ? '✓ SYNCHRONISÉ' : `⚠️ ${errors} erreurs`;
    console.log(`${status}: ${saved} jours sauvegardés`);
    return errors === 0;
  } catch (err) {
    console.error('Erreur sync:', err);
    return false;
  }
};

// Refresh - pull latest from Supabase and merge with local
export const refreshPlanData = async (localPlanData) => {
  try {
    console.log('🔄 Refreshing from Supabase...');
    const serverData = await fetchPlanFromSupabase();

    // Merge: keep all local + add server changes
    const merged = { ...serverData, ...localPlanData };

    console.log('✓ Data merged and refreshed');
    return merged;
  } catch (err) {
    console.error('Erreur refresh:', err);
    return localPlanData;
  }
};
