export interface LocationParts {
  locality: string;
  city: string;
  state: string;
}

export function extractLocationParts(address?: string, title?: string): LocationParts {
  const text = `${address || ''} ${title || ''}`.toLowerCase();

  let state = 'Gujarat';
  let city = 'Ahmedabad';
  let locality = '';

  if (text.includes('pune') || text.includes('baner') || text.includes('wakad') || text.includes('kothrud') || text.includes('hinjewadi') || text.includes('balewadi') || text.includes('pashan') || text.includes('aundh')) {
    city = 'Pune';
    state = 'Maharashtra';
  } else if (text.includes('mumbai') || text.includes('bandra') || text.includes('andheri') || text.includes('powai') || text.includes('thane') || text.includes('navi mumbai')) {
    city = 'Mumbai';
    state = 'Maharashtra';
  } else if (text.includes('ahmedabad') || text.includes('prahlad nagar') || text.includes('bopal') || text.includes('sg highway') || text.includes('satellite') || text.includes('bodakdev') || text.includes('vastrapur') || text.includes('gota') || text.includes('vaishno devi') || text.includes('jagatpur') || text.includes('iscon')) {
    city = 'Ahmedabad';
    state = 'Gujarat';
  } else if (text.includes('surat') || text.includes('vesu') || text.includes('adajan') || text.includes('vip road')) {
    city = 'Surat';
    state = 'Gujarat';
  } else if (text.includes('vadodara') || text.includes('alkapuri') || text.includes('gotri')) {
    city = 'Vadodara';
    state = 'Gujarat';
  } else if (text.includes('rajkot') || text.includes('kalawad')) {
    city = 'Rajkot';
    state = 'Gujarat';
  } else if (text.includes('dholera')) {
    city = 'Dholera SIR';
    state = 'Gujarat';
  } else if (text.includes('bengaluru') || text.includes('bangalore') || text.includes('whitefield')) {
    city = 'Bengaluru';
    state = 'Karnataka';
  } else if (text.includes('hyderabad') || text.includes('hitech')) {
    city = 'Hyderabad';
    state = 'Telangana';
  } else if (text.includes('delhi') || text.includes('noida') || text.includes('gurugram') || text.includes('gurgaon')) {
    city = 'Delhi NCR';
    state = 'Delhi';
  }

  if (address) {
    const parts = address.split(',').map((p) => p.trim());
    const filtered = parts.filter(
      (p) =>
        p.length > 0 &&
        !p.toLowerCase().includes(city.toLowerCase()) &&
        !p.toLowerCase().includes(state.toLowerCase()) &&
        !/^\d+$/.test(p) &&
        !p.toLowerCase().includes('india') &&
        !/^\d{6}$/.test(p)
    );
    if (filtered.length > 0) {
      locality = filtered[filtered.length - 1];
    } else {
      locality = parts[0] || city;
    }
  } else {
    locality = city;
  }

  return { locality, city, state };
}
