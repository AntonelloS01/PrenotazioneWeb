# PrenotazioneWeb

cambiare nome su config del database e la password di mysql per far funzionare il codice,
npm start su backend e npm start su front end


creare su mysql 
CREATE TABLE `bookings`.`bookings` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `number` INT NOT NULL,
   `time` VARCHAR(10) NOT NULL,
   `user` INT NOT NULL,
  PRIMARY KEY (`id`)
);


CREATE TABLE `bookings`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);