-- MySQL dump 10.13  Distrib 8.0.13, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: web_shop
-- ------------------------------------------------------
-- Server version	8.0.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `artikli`
--

DROP TABLE IF EXISTS `artikli`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `artikli` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `naziv` text NOT NULL,
  `opis` longtext,
  `slika` text,
  `cena` float NOT NULL,
  `stanje` text NOT NULL,
  `kolicina` int(11) NOT NULL,
  `datum` datetime NOT NULL,
  `kategorije_id` int(11) NOT NULL,
  `korisnici_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_artikli_kategorije_idx` (`kategorije_id`),
  KEY `fk_artikli_korisnici1_idx` (`korisnici_id`),
  CONSTRAINT `fk_artikli_kategorije` FOREIGN KEY (`kategorije_id`) REFERENCES `kategorije` (`id`),
  CONSTRAINT `fk_artikli_korisnici1` FOREIGN KEY (`korisnici_id`) REFERENCES `korisnici` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artikli`
--

LOCK TABLES `artikli` WRITE;
/*!40000 ALTER TABLE `artikli` DISABLE KEYS */;
INSERT INTO `artikli` VALUES (3,'intel i9 9900k','3.6 GHz, boost 5.0 GHz','data:image/jpeg;base64,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',99999,'Novo',6,'2019-01-29 21:41:03',5,1),(6,'Nvidea GTX 1060','6gb VRAM\nddr5 192 bit','https://s.yimg.com/aah/outletpc/msi-gtx-1060-aero-itx-6g-oc-geforce-gtx-1060-graphics-card-180.jpg',45999,'Novo',3,'2019-01-29 21:55:15',2,2),(8,'HyperX','8gb, DDR4 2400Mhz','https://cf5.s3.souqcdn.com/item/2019/01/11/34/97/90/25/item_XL_34979025_847cbe34a24d6.jpg',8499,'Novo',10,'2019-01-29 22:43:58',1,2);
/*!40000 ALTER TABLE `artikli` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kategorije`
--

DROP TABLE IF EXISTS `kategorije`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `kategorije` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nazivKategorije` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kategorije`
--

LOCK TABLES `kategorije` WRITE;
/*!40000 ALTER TABLE `kategorije` DISABLE KEYS */;
INSERT INTO `kategorije` VALUES (1,'RAM'),(2,'Graficke kartice'),(3,'Maticna ploca'),(4,'Napajanje'),(5,'Procesori'),(6,'Memorija');
/*!40000 ALTER TABLE `kategorije` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `korisnici`
--

DROP TABLE IF EXISTS `korisnici`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `korisnici` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `korisnicko_ime` text NOT NULL,
  `lozinka` text NOT NULL,
  `profilna_slika` text,
  `ime` text NOT NULL,
  `prezime` text NOT NULL,
  `adresa` text NOT NULL,
  `email` text NOT NULL,
  `telefon` text,
  `stanje_racuna` float NOT NULL,
  `prijavljen` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `korisnici`
--

LOCK TABLES `korisnici` WRITE;
/*!40000 ALTER TABLE `korisnici` DISABLE KEYS */;
INSERT INTO `korisnici` VALUES (1,'test','test',NULL,'test','test','test','laki098@gmail.com','0637022966',11,1),(2,'Laki098','Bratmili1','https://scontent.fbeg2-1.fna.fbcdn.net/v/t1.0-9/10620776_1209705802391299_6439073954638065375_n.jpg?_nc_cat=107&_nc_ht=scontent.fbeg2-1.fna&oh=c3adcb46a37b2ce4eb428b3afabb8fbd&oe=5CF3900B','Lazar','Filipovic','bolmanska','laki098@gmail.com','0637022966',1000000,0);
/*!40000 ALTER TABLE `korisnici` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-01-30  0:35:32
