export class NotesConsumer {
    static consume(notes, element) {
        element.innerHTML = '';     // Borrado
        notes.forEach(note => {
            NotesConsumer.addSingleNote(note, element);
        });
    }

    static addSingleNote(note, element) {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        if (note.type === 'critica') noteElement.classList.add('critica');                      // Resaltar si es crítica
        const noteType = note.type === 'critica' ? 'CRÍTICA' : note.type.toUpperCase();         // Mostrar CRÍTICA con tilde

        const header = document.createElement('div');
        header.classList.add('note-header');
        header.textContent = `${noteType} - ${new Date(note.creationDate).toLocaleString()}`;

        const content = document.createElement('p');
        content.classList.add('note-content');
        content.textContent = note.content;

        noteElement.appendChild(header);
        noteElement.appendChild(content);
        element.appendChild(noteElement);
    }
}
