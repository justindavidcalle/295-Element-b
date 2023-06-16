# 295-Element-b
 Bezeichnung    | Angaben               |
| --------------| ---------------       |
| Autor:        | Justin Calle          |
| Schule:       | ZLI                   |
| Modul:        | Projektmodul 295      |     
| Git-Repo-URL  | [Repository](https://github.com/justindavidcalle/295-Element-b) |

## Setup
1. Klonen Sie das oben erwähnte Git Repository 

```sh
git clone https://github.com/justindavidcalle/295-Element-b
```

2. Laden Sie folgende packete herunter:
* express
* express-session

```sh
npm install express express-session
```

3. Starten Sie nun das Projekt mit:
```sh
npm start
```
## Struktur

Wurde mit konfiguration von Eslint realisiert

## Endpunkte
Für mein Projekt habe ich folgende Endpunkte programmiert:

* GET /tasks

    Taskliste mit allen Tasks wird zurückgegeben.

* POST /tasks

    Erstellt einen neuen Task.

* GET /tasks/:id

    Task mit spezifischer ID wird zurückgegeben.

* PUT /tasks/:id

    Eine Task kann ersetzt werden mit angabe der ID.

* DELETE /tasks/:id

    Löscht durch die ID die spezifische Tasks.

* POST /login

    Man kann als Benutzer mit dem Passwort "m295" und beliebiger E-mail eingeloggt werden.

* GET /verify

    Verifiziert nochmal ob der Benutzer eingeloggt ist.

* DELETE /logout

    Der Benutzer wird wieder augeloggt.

