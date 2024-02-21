const logoPath = require("../../src/images/logoerickayser.png");

const moment  = require("moment");

module.exports = Object.freeze({
    CALENDAR_INITIAL_EVENTS : [
        {title : "Product call", theme : "GREEN", startTime : moment().add(-12, 'd').startOf('day'), endTime : moment().add(-12, 'd').endOf('day')},
        {title : "Meeting with tech team", theme : "PINK", startTime : moment().add(-8, 'd').startOf('day'), endTime : moment().add(-8, 'd').endOf('day')},
        {title : "Meeting with Cristina", theme : "PURPLE", startTime : moment().add(-2, 'd').startOf('day'), endTime : moment().add(-2, 'd').endOf('day')},
        {title : "Meeting with Alex", theme : "BLUE", startTime : moment().startOf('day'), endTime : moment().endOf('day')}, 
        {title : "Product Call", theme : "GREEN", startTime : moment().startOf('day'), endTime : moment().endOf('day')},
        {title : "Client Meeting", theme : "PURPLE", startTime : moment().startOf('day'), endTime : moment().endOf('day')},
        {title : "Client Meeting", theme : "ORANGE", startTime : moment().add(3, 'd').startOf('day'), endTime : moment().add(3, 'd').endOf('day')},
        {title : "Product meeting", theme : "PINK", startTime : moment().add(5, 'd').startOf('day'), endTime : moment().add(5, 'd').endOf('day')},
        {title : "Sales Meeting", theme : "GREEN", startTime : moment().add(8, 'd').startOf('day'), endTime : moment().add(8, 'd').endOf('day')},
        {title : "Product Meeting", theme : "ORANGE", startTime : moment().add(8, 'd').startOf('day'), endTime : moment().add(8, 'd').endOf('day')},
        {title : "Marketing Meeting", theme : "PINK", startTime : moment().add(8, 'd').startOf('day'), endTime : moment().add(8, 'd').endOf('day')},
        {title : "Client Meeting", theme : "GREEN", startTime : moment().add(8, 'd').startOf('day'), endTime : moment().add(8, 'd').endOf('day')},
        {title : "Sales meeting", theme : "BLUE", startTime : moment().add(12, 'd').startOf('day'), endTime : moment().add(12, 'd').endOf('day')},
        {title : "Client meeting", theme : "PURPLE", startTime : moment().add(16, 'd').startOf('day'), endTime : moment().add(16, 'd').endOf('day')},
    ],

    RECENT_TRANSACTIONS : [
        {name : "E.K la Marsa", avatar :logoPath, email : "alex", location : "Paris", amount : 100, date : moment().endOf('day')},
        {name : "E.K L'aouina", avatar : logoPath, email : "ereena", location : "London", amount : 190, date : moment().add(-1, 'd').endOf('day')},
        {name : "E.K Ariena", avatar : logoPath, email : "jhon", location : "Canada", amount : 112, date : moment().add(-1, 'd').endOf('day')},
        {name : "E.K Tunis", avatar : logoPath, email : "matrix", location : "Peru", amount : 111, date : moment().add(-1, 'd').endOf('day')},
        {name : "E.K Sousse", avatar : logoPath, email : "virat", location : "London", amount : 190, date : moment().add(-2, 'd').endOf('day')},
        {name : "E.K Ben Arouss", avatar : logoPath, email : "miya", location : "Paris", amount : 230, date : moment().add(-2, 'd').endOf('day')},
        {name : "E.K Gammarth", avatar : logoPath, email : "virat", location : "Canada", amount : 331, date : moment().add(-2, 'd').endOf('day')},
        {name : "E.K", avatar : logoPath, email : "matrix", location : "London", amount : 581, date : moment().add(-2, 'd').endOf('day')},
        {name : "E.K", avatar : logoPath, email : "ereena", location : "Tokyo", amount : 151, date : moment().add(-2, 'd').endOf('day')},
        {name : "E.K", avatar : logoPath, email : "jhon", location : "Paris", amount : 91, date : moment().add(-2, 'd').endOf('day')},
        {name : "E.K", avatar : logoPath, email : "virat", location : "Canada", amount : 161, date : moment().add(-3, 'd').endOf('day')},
        
    
    ],
    RECENT_PROMOS : [
        {name : "test1", discount :"15%", date_debut : "12/05/2023", date_fin : "30/05/2023", Nouveau_Prix : "100dt", date : moment().endOf('day')},
        {name : "test2", discount : "25%", date_debut : "12/05/2023", date_fin : "30/05/2023", Nouveau_Prix : "190dt", date : moment().add(-1, 'd').endOf('day')},
        {name : "test3", discount : "35%", date_debut : "12/05/2023", date_fin : "30/05/2023", Nouveau_Prix : "112dt", date : moment().add(-1, 'd').endOf('day')},
        {name : "test4", discount : "5%", date_debut : "12/05/2023", date_fin : "30/05/2023", Nouveau_Prix : "111dt", date : moment().add(-1, 'd').endOf('day')},
        {name : "test5", discount : "10%", date_debut : "12/05/2023", date_fin : "30/05/2023", Nouveau_Prix : "190dt", date : moment().add(-2, 'd').endOf('day')},
        {name : "test6", discount : "20%", date_debut : "12/05/2023", date_fin : "30/05/2023", Nouveau_Prix : "230dt", date : moment().add(-2, 'd').endOf('day')},
        {name : "test7", discount : "30%", date_debut : "12/05/2023", date_fin : "30/05/2023", Nouveau_Prix : "331dt", date : moment().add(-2, 'd').endOf('day')},
    ],
    RECENT_VENTE_FLASH : [
        {name : "test1",  duree : "5h",  Prix : "100dt", date : moment().endOf('day')},
        {name : "test2",  duree : "48h", Prix : "190dt", date : moment().add(-1, 'd').endOf('day')},
        {name : "test3", duree : "24h", Prix : "112dt", date : moment().add(-1, 'd').endOf('day')},
        {name : "test4",  duree : "24h", Prix : "111dt", date : moment().add(-1, 'd').endOf('day')},
        {name : "test5", duree : "9h", Prix : "190dt", date : moment().add(-2, 'd').endOf('day')},
        {name : "test6",  duree : "48h",  Prix : "230dt", date : moment().add(-2, 'd').endOf('day')},
        {name : "test7",  duree : "48h",  Prix : "331dt", date : moment().add(-2, 'd').endOf('day')},
    ],
    RECENT_PRODUITS : [
        {reference : "1000011", libelle : "produit1",  catégorie : "Restaurant", montant : "50,5",qunatite:"100",categorieId:"2",sldfid:"8",prix:"8,9 DT"},
        {reference : "1000012",  libelle : "produit2", catégorie : "Restaurant", montant :"50,5",qunatite:"100",categorieId:"2",sldfid:"8",prix:"8,9 DT"},
        {reference : "1000013", libelle : "produit3", catégorie : "Restaurant", montant : "50,5",qunatite:"100",categorieId:"2",sldfid:"8",prix:"8,9 DT"},
        {reference : "1000014",  libelle : "produit4", catégorie : "Restaurant", montant :"50,5",qunatite:"100",categorieId:"2",sldfid:"8",prix:"8,9 DT"},
        {reference : "1000015", libelle : "produit5", catégorie : "Restaurant", montant : "50,5",qunatite:"100",categorieId:"2",sldfid:"8",prix:"8,9 DT"},
        {reference : "1000016",  libelle : "produit6",  catégorie : "Restaurant", montant :"50,5",qunatite:"100",categorieId:"2",sldfid:"8",prix:"8,9 DT"},
        {reference : "1000017",  libelle : "produit7",  catégorie : "Restaurant", montant : "50,5",qunatite:"100",categorieId:"2",sldfid:"8",prix:"8,9 DT"},
    ]
});
