export class NotesConsumer {
    static consume(notes, element) {
        element.innerHTML = '';     // Borrado
        notes.forEach(note => {
            NotesConsumer.addSingleNote(note, element);
        });
    }

    static addSingleNote(note, element) {
        const noteElement = document.createElement('p');
        noteElement.textContent = `(${note.type.toUpperCase()}) ${note.content} - ${new Date(note.creationDate).toLocaleString()}`;
        element.appendChild(noteElement);
    }
}