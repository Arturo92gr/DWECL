import { NotesHandler } from './modules/NotesHandler.js';
import { NotesConsumer } from './modules/NotesConsumer.js';

const notesHandler = new NotesHandler('http://localhost:3000/notes');
const noteForm = document.getElementById('noteForm');
const notesListElement = document.getElementById('notesList');

    // Función para mostrar todas las notas
    notesHandler.getAllNotes((notes) => {
        NotesConsumer.consume(notes, notesListElement);
    }, (error) => {
        console.error("Error al obtener las notas:", error);
    });
    
    // Evento de envío al formulario para crear nuevas notas
    noteForm.addEventListener('submit', (event) => {
        event.preventDefault();
    
        const type = event.target.type.value;
        const content = event.target.content.value;
    
        notesHandler.addNote({ type, content }, (newNote) => {
            NotesConsumer.addSingleNote(newNote, notesListElement);
            noteForm.reset();
        }, (error) => {
            console.error("Error al agregar la nota:", error);
        });
    });