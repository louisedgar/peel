var dbPromise = idb.open('myTeam', 1, function (upgradeDb) {
    var teamObjStore = upgradeDb.createObjectStore('team', {
      keyPath: 'id'
    })
    teamObjStore.createIndex('name', 'name', {
      unique: false
    })
  });
  
function saveTeam(content) {
    dbPromise
        .then(function(db) {
            var tx = db.transaction('team', 'readwrite')
            var store = tx.objectStore('team')
            var item = content
            store.put(item)
            return tx.complete
        })
        .then(function() {
            console.log('Team berhasil disimpan.')
        })
        .catch(function() {
            console.log('Team gagal disimpan.')
        })
};

function getTeam() {
    return new Promise(function(resolve, reject) {
    dbPromise
        .then(function(db) {
        var tx = db.transaction('team', 'readonly')
        var store = tx.objectStore('team')
        return store.getAll()
        })
        .then(function(item) {
        resolve(item)
        })
    })
};

function deleteTeam(id) {
    dbPromise.then(function(db) {
        var tx = db.transaction('team', 'readwrite');
        var store = tx.objectStore('team');
        store.delete(id);
        return tx.complete;
    }).then(function () {
        console.log('Team berhasil dihapus');
        getSavedTeam();
    }).catch(function() {
        console.log('Team gagal disimpan.');
    })
};