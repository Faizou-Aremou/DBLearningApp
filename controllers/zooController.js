const mySqlRoot = require('../db/mysql/mysql-root');

// route enfant message
exports.welcomeMessage = (req, res) => {
    res.json({ message: 'Hello world' });
}

/**
 * Nom des animaux 
 * projection simple
 * select nomA from LesAnimaux
 */

exports.animalsNames = (req, res) => {

    mySqlRoot.query('select nomA from `LesAnimaux`').then((result) => {
        res.json({
            nomAs: result
        });
    }).catch((err) => {
        res.status(503).send(err);
    });

}


/**
 * Maladies contractées au moins une fois par les animaux du zoo
 * select distinct nomM from LesMaladies 
 */

exports.animalsDiseaseOnce = (req, res) => {

        mySqlRoot.query('select distinct nomM from `LesMaladies`').then((result) => {
            res.json({
                nomMs: result
            });
        }).catch((err) => {
            res.status(503).send(err);
        });

    }
    /**
     * Noms des employés qui habitent la ville de papeete
     * select nomE from Emmployes where adresse=papeete
     */
exports.employee = (req, res) => {

    mySqlRoot.query('select nomE from `LesEmployes` where `adresse`=?', ['papeete']).then((result) => {
        res.json({
            nomMs: result
        });
    }).catch((err) => {
        res.status(503).send(err);
    });

}

/**
 * Noms et numéros de cage, des animaux males qui sont originaires du gabon et dont la date de naissance est antérieure à 1980
 * select nomA, noCage from LesAnimaux where sexe='male' and pays='gabon' and anNais<1980
 */
exports.gabonAnimalsNames = (req, res) => {

    mySqlRoot.query('select nomA, noCage from `LesAnimaux` where `sexe`=? and pays=?', ['male', 'gabon']).then((result) => {
        res.json({
            nomAs_noCages: result
        })
    }).catch((err) => {
        res.status(503).send(err);
    });
}

/**
 * Animaux qui n'ont jamais été malades
 * select distinct a.nomA from LesAnimaux a 
 * left join 
 * LesMaladies m on a.nomA = m.nomA where m.nomM is null;
 */
exports.animauxNoMalades = (req, res) => {
    mySqlRoot.query('select distinct LesAnimaux.nomA from `LesAnimaux` left join `LesMaladies` on (LesAnimaux.nomA = LesMaladies.nomA) where LesMaladies.nomM is null').then((result) => {
        res.json({
            nomAs: result
        })
    }).catch((err) => {
        res.status(503).send(err);
    })
}

/**
 * Animaux et leur type qui n'ont jamais été malades
 * select distinct a.nomA, typeA from LesAnimaux a
 * left join
 * LesMaladies m on a.nomA = m.nomA where m.nomM is null;
 */
exports.animauxTypesNoMalades = (req, res) => {
        mySqlRoot.query('select distinct LesAnimaux.nomA, typeA from LesAnimaux left join LesMaladies on (LesAnimaux.nomA = LesMaladies.nomA) where LesMaladies.nomM is null').then((result) => {
            res.json({
                nomAs_types: result
            })
        }).catch((err) => {
            res.status(503).send(err);
        })
    }
    /**
     * Noms des animaux originaires du kenya qui ont contractés une grippe
     * select distinct nomA from LesAnimaux natural join LesMaladies
     * where pays='Kenya' and nomM='grippe'
     */
exports.animauxKenyaGrippe = (req, res) => {
    mySqlRoot.query('select distinct nomA from LesAnimaux natural join LesMaladies where pays=? and nomM=?', ['Kenya', 'grippe']).then((result) => {
        res.json({
            nomAs: result
        })
    }).catch((err) => {
        res.status(503).send(err);
    })
}


/**
 * numéros et fonction des cages qui sont inocuppées
 * select c.noCage, fonction from LesCages c
 * left join
 * LesAnimaux a on c.noCage = a.noCage
 * where anNais is null
 */

exports.cagesInocuppee = (req, res) => {
        mySqlRoot.query(`select LesCages.noCage, fonction from LesCages left join
   LesAnimaux on (LesCages.noCage = LesAnimaux.noCage) where anNais is null`).then((result) => {
            res.json({
                noCages: result
            })
        }).catch((err) => {
            res.status(503).send(err);
        })
    }
    /**
     * donner pour chaque animal hermaphrodite l'ensemble des maladies qu'il a contractrées
     * (ensemble couple nom d'animal, nom de maladies)
     * select * from LesMaladies
     */

/**
 * il n'y pas de gardiens affecté à des cases vides
 * select g.nomE from LesCages c
 * left join
 * LesAnimaux a on c.noCage = a.noCage
 * left join
 * LesGardiens g on c.noCage = g.noCage
 * where nomE is null
 */
exports.gardiensCagesVides = (req, res) => {
        mySqlRoot.query(`select LesGardiens.nomE from LesCages left join
   LesAnimaux on (LesCages.noCage = LesAnimaux.noCage) 
   left join
   LesGardiens on LesCages.noCage = LesGardiens.noCage
   where nomE is null`).then((result) => {
            res.json({
                nomEs: result
            })
        }).catch((err) => {
            res.status(503).send(err);
        })
    }
    /**
     * un employé est soit un gardien, soit un responsable
     * select distinct e.nomE from LesEmployes e
     * left join LesGardiens g on e.nomE = g.nomE
     * left join LesResponsables r on e.nomE = r.nomE
     * where noCage is null or noAllee is null
     *
     */
exports.employes = (req, res) => {
        mySqlRoot.query(
            `select distinct LesEmployes.nomE from LesEmployes
    left join LesGardiens on (LesEmployes.nomE = LesGardiens.nomE)
    left join LesResponsables on (LesEmployes.nomE = lesResponsables.nomE)
    where noCage is null or noAllee is null`
        ).then((result) => {
            res.json({
                nomEs: result
            })
        }).catch((err) => {
            res.status(503).send(err);
        })
    }
    /**
     * 7) numéros et fonctions des cages qui sont partagés par des animaux
     * différents
     */
exports.distinctFunc = (req, res) => {
    mySqlRoot.query(
        `select noCage, fonction from LesCages
    natural join LesAnimaux 
    group by noCage
    having count(distinct typeA)> 1`
    ).then((result) => {
        res.json({
            noCage_function: result
        })
    }).catch((err) => {
        res.status(503).send(err);
    })
}

/**
 * 8)
 * select r.nomE as Responsables, g.nomE as les Gardiens
 * from LesCages c join LesResponsables r on c.noAllee = r.noAllee
 * join LesGardiens g on c.noCage = g.noCage join LesAnimaux a
 * on a.noCage = c.noCage
 * where nomA = 'Charly'
 */
exports.employesCharly = (req, res) => {
    mySqlRoot.query(
        `select LesResponsables.nomE, LesGardiens.nomE
     from LesCages join LesResponsables on (LesCages.noAllee = LesResponsables.noAllee)
     join LesGardiens on (LesCages.noCage = LesGardiens.noCage) join LesAnimaux
     on (LesAnimaux.noCage = LesCages.noCage)
     where nomA = ?`, ['Charly']
    ).then((result) => {
        res.json({
            nomEsGardiens_nomEsResp: result
        })
    }).catch((err) => {
        res.status(503).send(err);
    })
}


/**
 * 9) select nomA, pays from LesAnimaux where anNais in (select min(anNais) from LesAnimaux)
 */

exports.doyenzoo = (req, res) => {
        mySqlRoot.query(
            `select nomA, pays 
    from LesAnimaux 
    where anNais in (select min(anNais) from LesAnimaux)`
        ).then((result) => {
            res.json({
                nomAs_pays: result
            })
        }).catch((err) => {
            res.status(503).send(err);
        })
    }
    /**
     * 10)
     */

/**
 * 11) select nomA, pays from LesAnimaux where noCage in (select noCage from LesAnimaux where nomA = 'Arthur') and nomA <> 'Arthur';
 */

exports.cageArthur = (req, res) => {
    mySqlRoot.query(
        `select nomA, pays from 
    LesAnimaux 
    where noCage in (select noCage from LesAnimaux where nomA = ?)`, ['Arthur']
    ).then((result) => {
        res.json({
            nomEs: result
        })
    }).catch((err) => {
        res.status(503).send(err);
    })
}