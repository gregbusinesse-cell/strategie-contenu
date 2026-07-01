import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Plan data functions
export const fetchPlanFromSupabase = async () => {
  try {
    const { data, error } = await supabase
      .from('plan')
      .select('*')
      .order('day_number', { ascending: true });

    if (error) throw error;

    // Convert array to object format {day_number: {...}}
    const planObj = {};
    data.forEach(item => {
      planObj[item.day_number] = {
        title: item.title,
        description: item.description,
        completed: item.completed,
        id: item.id
      };
    });
    return planObj;
  } catch (err) {
    console.error('Erreur fetch plan:', err);
    return {};
  }
};

export const savePlanToSupabase = async (dayNumber, dayData) => {
  try {
    // Check if exists
    const { data: existing } = await supabase
      .from('plan')
      .select('id')
      .eq('day_number', dayNumber)
      .single();

    if (existing) {
      // Update
      const { error } = await supabase
        .from('plan')
        .update({
          title: dayData.title,
          description: dayData.description,
          completed: dayData.completed,
          updated_at: new Date().toISOString()
        })
        .eq('day_number', dayNumber);

      if (error) throw error;
    } else {
      // Insert
      const { error } = await supabase
        .from('plan')
        .insert({
          day_number: dayNumber,
          title: dayData.title,
          description: dayData.description,
          completed: dayData.completed
        });

      if (error) throw error;
    }

    return true;
  } catch (err) {
    console.error('Erreur save plan:', err);
    return false;
  }
};

// Sync plan data
export const syncAllPlanData = async (localPlanData) => {
  try {
    for (const [dayNum, dayData] of Object.entries(localPlanData)) {
      await savePlanToSupabase(parseInt(dayNum), dayData);
    }
    return true;
  } catch (err) {
    console.error('Erreur sync:', err);
    return false;
  }
};

// Real-time subscription
export const subscribeToPlanChanges = (callback) => {
  return supabase
    .from('plan')
    .on('*', payload => {
      callback(payload);
    })
    .subscribe();
};
