export class NotesHandler {
    constructor(url) {
        this._url = url;
        this._lastQueryStatus = null;
    }

    getAllNotes(onSuccessCallback, onErrorCallback) {
        fetch(this._url)
            .then(response => response.json().then((data) => {
                this._lastQueryStatus = true;
                onSuccessCallback(data);
            }, (error) => {
                this._lastQueryStatus = false;
                onErrorCallback('JSONException');
            }))
            .catch((error) => {
                this._lastQueryStatus = false;
                onErrorCallback('ConnectionException');
            });
    }

    addNote(noteData, onSuccessCallback, onErrorCallback) {
        fetch(this._url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(noteData)
        })
        .then(response => response.json().then((data) => {
            this._lastQueryStatus = true;
            onSuccessCallback(data);
        }, (error) => {
            this._lastQueryStatus = false;
            onErrorCallback('JSONException');
        }))
        .catch((error) => {
            this._lastQueryStatus = false;
            onErrorCallback('ConnectionException');
        });
    }
}