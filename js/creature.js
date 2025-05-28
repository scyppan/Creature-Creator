let currentcreature;

function loadcreature(creaturename) {
  currentcreature = Object.values(creatures).find(
    c => c.meta?.creaturename === creaturename
  );

  const container = document.getElementById("creaturecontainer");
  container.innerHTML = ''; // clear old content

  container.appendChild(renderdemographics());
  container.appendChild(renderwoundstats());
  container.appendChild(renderdescription());
  container.appendChild(renderintelligenceandmovement());
  container.appendChild(rendersocialrules());
}

function randbetween(sizelo, sizehi) {
    const lo = parseInt(sizelo);
    const hi = parseInt(sizehi);

    return Math.floor(Math.random() * (hi - lo + 1)) + lo;
}

function renderdemographics() {
  const { creaturename, creaturetype, sizelo, sizehi } = currentcreature.meta;

  const el = document.createElement('div');
  el.textContent = `${creaturename} (${creaturetype} | Size: ${randbetween(sizelo, sizehi)})`;
  return el;
}

function renderwoundstats() {
  const { woundcaplo, woundcaphi, magicalresistlo, magicalresisthi } = currentcreature.meta;

  const cap = randbetween(woundcaplo, woundcaphi);
  let text = `Heavy Wound Cap: ${cap}`;

  if (magicalresistlo && magicalresisthi) {
    const res = randbetween(magicalresistlo, magicalresisthi);
    text += ` | Res. ${res}`;
  }

  const el = document.createElement('div');
  el.textContent = text;
  return el;
}

function renderdescription() {
  const el = document.createElement('div');
  el.textContent = '\n' + currentcreature.meta.description || '[No description]';
  return el;
}

function renderintelligenceandmovement() {
  const m = currentcreature.meta;
  let text = '\n';

  if (m.beastintello && m.beastintelhi) {
    const val = randbetween(m.beastintello, m.beastintelhi);
    text += `Beastial Intel: ${val}`;
  } else if (m.humanintello && m.humanintelhi) {
    const val = randbetween(m.humanintello, m.humanintelhi);
    text += `Human Intel: ${val}`;
  }

  if (m.sociallo && m.socialhi) {
    const val = randbetween(m.sociallo, m.socialhi);
    text += ` | Human Social Skills: ${val}`;
  }

  text += '\n';

  const ground = (m.groundlo && m.groundhi)
    ? randbetween(m.groundlo, m.groundhi)
    : "Can't move";

  const water = (m.waterlo && m.waterhi)
    ? randbetween(m.waterlo, m.waterhi)
    : "Will drown";

  const air = (m.airlo && m.airhi)
    ? randbetween(m.airlo, m.airhi)
    : "Will fall";

  text += `Movement: Ground: ${ground} | Water: ${water} | Air: ${air}`;

  const el = document.createElement('div');
  el.textContent = text;
  return el;
}

function rendersocialrules() {
  const m = currentcreature.meta;
  let text = '\nSocial Rules\n';

  const lured = m.lured && m.lured !== 'No' ? 'Can be lured' : 'Cannot be lured';
  const tamed = m.tamed && m.tamed !== 'No' ? 'Can be tamed' : 'Cannot be tamed';
  const bond  = m.bond  && m.bond  !== 'No' ? 'Can bond'     : 'Cannot bond';

  text += `${lured} | ${tamed} | ${bond}\n`;

  if (m.independence)
    text += `Independence: ${m.independence}\n`;

  if (m.addtlrules)
    text += `Additional Rules: ${m.addtlrules}`;

  const el = document.createElement('div');
  el.textContent = text;
  return el;
}

function renderattacks() {
  const attacks = getattacks();
  if (!attacks.length) return document.createElement('div');

  const el = document.createElement('div');
  el.textContent = 'Attacks';

  attacks.forEach((name, i) => {
    const attackline = document.createElement('div');
    const button = document.createElement('button');
    const result = document.createElement('span');

    const desc = currentcreature.meta.attackdescription?.[i] || '';

    // Immediate Wounds (optional)
    const iwtype = currentcreature.meta.immediatewoundtype?.[i];
    const iwamt  = currentcreature.meta.immediatewoundamtnum?.[i];
    const iwcat  = currentcreature.meta.immediatewoundamtcat?.[i];

    let iwstring = '';
    if (iwtype) {
      iwstring = `\n\nImmediate Wounds:\n${iwamt} ${iwcat} (${iwtype})`;
    }

    // Damage over Time (optional)
    const dotwtype = currentcreature.meta.dotwoundtype?.[i];
    const dotwamt  = currentcreature.meta.dotwoundamtnum?.[i];
    const dotwcat  = currentcreature.meta.dotwoundamtcat?.[i];

    let dotstring = '';
    if (dotwtype) {
      dotstring = `\n\nDamage over Time:\n${dotwamt} ${dotwcat} (${dotwtype})`;
    }

    button.textContent = name;
    button.title = `${name}\n${desc}${iwstring}${dotstring}`;

    button.addEventListener('click', () => {
      const lo = parseInt(currentcreature.meta.creatureattacklo?.[i]);
      const hi = parseInt(currentcreature.meta.creatureattackhi?.[i]);

      if (isNaN(lo) || isNaN(hi)) {
        result.textContent = ' — Invalid range';
        return;
      }

      const rolled = randbetween(lo, hi);
      result.textContent = ` → ${rolled}`;
    });

    attackline.appendChild(button);
    attackline.appendChild(result);
    el.appendChild(attackline);
  });

  return el;
}

function renderabilities() {
  const abilities = getabilities();
  if (!abilities.length) return document.createElement('div');

  const el = document.createElement('div');
  el.textContent = 'Abilities';

  abilities.forEach((name, i) => {
    const abline = document.createElement('div');
    const button = document.createElement('button');
    const result = document.createElement('span');

    const desc = currentcreature.meta.abilitydescription?.[i] || '';
    button.textContent = name;
    button.title = `${name}\n${desc}`;

    button.addEventListener('click', () => {
      const lo = parseInt(currentcreature.meta.creatureabilitylo?.[i]);
      const hi = parseInt(currentcreature.meta.creatureabilityhi?.[i]);
      if (isNaN(lo) || isNaN(hi)) {
        result.textContent = ' — Invalid range';
        return;
      }
      const rolled = randbetween(lo, hi);
      result.textContent = ` → ${rolled}`;
    });

    abline.appendChild(button);
    abline.appendChild(result);
    el.appendChild(abline);
  });

  return el;
}