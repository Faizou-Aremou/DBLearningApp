-- supprimer les tables existantes avant de recreer la base de données
drop table LesEmployes;
drop table LesGardiens;
drop table LesResponsables;
drop table LesMaladies;
drop table LesAnimaux;
drop table LesCages;


-- creation de table 
create table LesCages (
    noCage INT(2),
    fonction VARCHAR(20),
    noAllee INT(2),
    constraint pk_cages_noCage primary key (noCage)
);

create table LesAnimaux (
nomA VARCHAR(20),
sexe VARCHAR (20),
typeA VARCHAR (20),
pays VARCHAR (20),
anNais INT(4),
noCage INT(2),
constraint pk_animaux_nomA primary key (nomA),
constraint fk_animaux_noCage foreign key (noCage) references LesCages (noCage)
);

create table LesResponsables (
    noAllee INT(2),
    nomE VARCHAR(20),
    constraint pk_responsables_noAllee primary key (noAllee)

);

create table LesMaladies (
    nomA VARCHAR(20),
    nomM VARCHAR(20),
    constraint pk_maladies_nomA_nomM primary key (nomA, nomM),
    constraint fk_maladies_nomA foreign key (nomA) references LesAnimaux (nomA)
);
create table LesEmployes (
    nomE VARCHAR(20),
    adresse VARCHAR(20)
);
create table LesGardiens (
    noCage INT(2),
    nomE VARCHAR (20),
    constraint pk_gardiens_noCage_nomE primary key (noCage, nomE),
    constraint fk_gardiens_noCage foreign key (noCage) references LesAnimaux (noCage)
);
