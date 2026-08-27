export interface LocationParts {
  locality: string;
  city: string;
  state: string;
}

export function extractLocationParts(address?: string, title?: string): LocationParts {
  const rawText = `${address || ''} ${title || ''}`.trim();
  const text = rawText.toLowerCase();

  if (!text) {
    return { locality: '', city: '', state: '' };
  }

  let state = '';
  let city = '';
  let locality = '';

  // 1. Detect City & State
  if (text.includes('pune') || text.includes('baner') || text.includes('wakad') || text.includes('kothrud') || text.includes('hinjewadi') || text.includes('balewadi') || text.includes('pashan') || text.includes('aundh') || text.includes('kharadi') || text.includes('viman nagar') || text.includes('magarpatta') || text.includes('hadapsar') || text.includes('bavdhan')) {
    city = 'Pune';
    state = 'Maharashtra';
  } else if (text.includes('mumbai') || text.includes('bandra') || text.includes('andheri') || text.includes('powai') || text.includes('thane') || text.includes('navi mumbai') || text.includes('malad') || text.includes('borivali') || text.includes('worli') || text.includes('bkc')) {
    city = 'Mumbai';
    state = 'Maharashtra';
  } else if (text.includes('dholera')) {
    city = 'Dholera SIR';
    state = 'Gujarat';
  } else if (text.includes('ahmedabad') || text.includes('prahlad nagar') || text.includes('bopal') || text.includes('sg highway') || text.includes('satellite') || text.includes('bodakdev') || text.includes('vastrapur') || text.includes('gota') || text.includes('vaishno devi') || text.includes('jagatpur') || text.includes('iscon') || text.includes('sanand') || text.includes('gift city')) {
    city = 'Ahmedabad';
    state = 'Gujarat';
  } else if (text.includes('surat') || text.includes('vesu') || text.includes('adajan') || text.includes('vip road') || text.includes('pal')) {
    city = 'Surat';
    state = 'Gujarat';
  } else if (text.includes('vadodara') || text.includes('alkapuri') || text.includes('gotri') || text.includes('vasna')) {
    city = 'Vadodara';
    state = 'Gujarat';
  } else if (text.includes('rajkot') || text.includes('kalawad') || text.includes('150 feet ring road')) {
    city = 'Rajkot';
    state = 'Gujarat';
  } else if (text.includes('bengaluru') || text.includes('bangalore') || text.includes('whitefield') || text.includes('koramangala') || text.includes('hsr') || text.includes('indiranagar') || text.includes('sarjapur') || text.includes('marathahalli')) {
    city = 'Bengaluru';
    state = 'Karnataka';
  } else if (text.includes('hyderabad') || text.includes('hitech') || text.includes('gachibowli') || text.includes('madhapur') || text.includes('jubilee hills') || text.includes('kondapur')) {
    city = 'Hyderabad';
    state = 'Telangana';
  } else if (text.includes('delhi') || text.includes('noida') || text.includes('gurugram') || text.includes('gurgaon') || text.includes('faridabad') || text.includes('ghaziabad')) {
    city = text.includes('noida') ? 'Noida' : text.includes('gurugram') || text.includes('gurgaon') ? 'Gurugram' : 'Delhi NCR';
    state = text.includes('noida') || text.includes('ghaziabad') ? 'Uttar Pradesh' : text.includes('gurugram') || text.includes('gurgaon') ? 'Haryana' : 'Delhi';
  } else if (text.includes('chennai') || text.includes('coimbatore') || text.includes('madurai')) {
    city = 'Chennai';
    state = 'Tamil Nadu';
  } else if (text.includes('kolkata') || text.includes('new town') || text.includes('howrah')) {
    city = 'Kolkata';
    state = 'West Bengal';
  } else if (text.includes('jaipur') || text.includes('jodhpur') || text.includes('udaipur')) {
    city = 'Jaipur';
    state = 'Rajasthan';
  } else if (text.includes('kochi') || text.includes('thiruvananthapuram') || text.includes('calicut')) {
    city = 'Kochi';
    state = 'Kerala';
  } else if (text.includes('lucknow') || text.includes('kanpur') || text.includes('varanasi')) {
    city = 'Lucknow';
    state = 'Uttar Pradesh';
  } else if (text.includes('indore') || text.includes('bhopal')) {
    city = 'Indore';
    state = 'Madhya Pradesh';
  } else if (text.includes('chandigarh') || text.includes('mohali') || text.includes('ludhiana')) {
    city = 'Chandigarh';
    state = 'Punjab';
  }

  // 2. Extract specific Locality
  if (address) {
    const parts = address.split(',').map((p) => p.trim());
    const filtered = parts.filter(
      (p) =>
        p.length > 0 &&
        (!city || !p.toLowerCase().includes(city.toLowerCase())) &&
        (!state || !p.toLowerCase().includes(state.toLowerCase())) &&
        !/^\d+$/.test(p) &&
        !p.toLowerCase().includes('india') &&
        !/^\d{6}$/.test(p)
    );
    if (filtered.length > 0) {
      locality = filtered[0];
    } else {
      locality = parts[0] || city;
    }
  } else if (city) {
    locality = city;
  }

  return { locality, city, state };
}
