function loadcreature(name) {
    const creature = creatures.find(c => c.meta?.creaturename === name);

    console.log('Creature loaded:', creature);
    let container = document.getElementById("creaturecontainer");

    let name = document.createElement('div');
    name.textContent = creature.meta.creaturename;
    container.appendChild(name);
}