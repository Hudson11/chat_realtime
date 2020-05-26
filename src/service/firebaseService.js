import { firebaseDatabase, storage } from '../config/firebase';

export default class FirebaseService{

    static insertOne(path, data, callback){
        let ref = firebaseDatabase.ref(path);
        ref.push(data,(err) =>{
            if(err)
                callback(null, err);
            callback(data, null);
        });
    }

    static getListMessages(path, callback){
        firebaseDatabase.ref(path).on('value', (snapshot) => {
            let items = [];
            snapshot.forEach(childSnapshot => {
                let item = {};
                item['key'] = childSnapshot.key;
                item['user'] = childSnapshot.toJSON().user;
                item['mensagem'] = childSnapshot.toJSON().mensagem;
                item['horarioEnvio'] = childSnapshot.toJSON().horarioEnvio;
                items.push(item);
            });
            callback(items);
        });
    }

    static getUsersOn(path, callback){
        firebaseDatabase.ref(path).on('value', (snapshot) => {
            let items = [];
            snapshot.forEach(childSnapshot => {
                childSnapshot.forEach(data => {
                    let item = {};
                    item['doc'] = data.toJSON().doc;
                    item['_id'] = data.toJSON()._id;
                    items.push(item);
                })
            });
            callback(items);
        });
    }

    static deleteUser(path){
        firebaseDatabase.ref(path).remove((err) => {
            if(err)
                console.log(err);
        });
    }

    static getUserByUsername(path, user, callback){
        firebaseDatabase.ref(path).orderByChild('username').equalTo(user).on('value', (snapshot) => {
            if(snapshot.val() === null){
                callback(null, true);
            }
            else
                snapshot.forEach(child => {
                    return callback({_id: child.key, doc: child.toJSON()}, false);
                });
        });
    }

    static insertFile(file){
        return storage.ref('/files/'+ file.name).put(file);
    }

    static changeUser(path, user){
        firebaseDatabase.ref(path).update(user, (err) => {
            console.log(err);
        });

    }
}