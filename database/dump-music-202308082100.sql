-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: music
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `song_id` int NOT NULL,
  `date` date NOT NULL,
  `text` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `user_id` (`user_id`),
  KEY `song_id` (`song_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`song_id`) REFERENCES `songs` (`song_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follow`
--

DROP TABLE IF EXISTS `follow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follow` (
  `follow_id` int NOT NULL AUTO_INCREMENT,
  `follow_userID` int NOT NULL,
  `check_seen` tinyint DEFAULT NULL,
  PRIMARY KEY (`follow_id`),
  KEY `follow_userID` (`follow_userID`),
  CONSTRAINT `follow_ibfk_1` FOREIGN KEY (`follow_userID`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follow`
--

LOCK TABLES `follow` WRITE;
/*!40000 ALTER TABLE `follow` DISABLE KEYS */;
/*!40000 ALTER TABLE `follow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interacts`
--

DROP TABLE IF EXISTS `interacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `interacts` (
  `interact_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `song_id` int NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`interact_id`),
  KEY `user_id` (`user_id`),
  KEY `song_id` (`song_id`),
  CONSTRAINT `interacts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `interacts_ibfk_2` FOREIGN KEY (`song_id`) REFERENCES `songs` (`song_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interacts`
--

LOCK TABLES `interacts` WRITE;
/*!40000 ALTER TABLE `interacts` DISABLE KEYS */;
INSERT INTO `interacts` VALUES (1,1,1,'2023-08-01'),(2,1,19,'2023-08-07'),(3,1,20,'2023-08-07'),(4,2,19,'2023-08-07');
/*!40000 ALTER TABLE `interacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `listeninghistory`
--

DROP TABLE IF EXISTS `listeninghistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `listeninghistory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `song_id` int NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `song_id` (`song_id`),
  CONSTRAINT `listeninghistory_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `listeninghistory_ibfk_2` FOREIGN KEY (`song_id`) REFERENCES `songs` (`song_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listeninghistory`
--

LOCK TABLES `listeninghistory` WRITE;
/*!40000 ALTER TABLE `listeninghistory` DISABLE KEYS */;
INSERT INTO `listeninghistory` VALUES (1,1,7,'2023-08-01'),(2,1,5,'2023-08-01');
/*!40000 ALTER TABLE `listeninghistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `role_id` int NOT NULL,
  `role_name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin'),(2,'user'),(3,'author');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `songs`
--

DROP TABLE IF EXISTS `songs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `songs` (
  `song_id` int NOT NULL AUTO_INCREMENT,
  `song_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `song_file` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `date` date NOT NULL,
  `thumbnail` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `type_id` int DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT 'music_128x128.png',
  `user_id` int NOT NULL,
  `heart` int NOT NULL DEFAULT '0',
  `singer` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `description` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`song_id`),
  KEY `type_id` (`type_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `songs_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `types` (`type_id`),
  CONSTRAINT `songs_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `songs`
--

LOCK TABLES `songs` WRITE;
/*!40000 ALTER TABLE `songs` DISABLE KEYS */;
INSERT INTO `songs` VALUES (1,'Anh Đã Lạc Vào','1690751826350-admin.1688591225574-admin.anhdalatvao.mp3','2023-07-31','1690751826350_admin_anhdalacvao.jpg',1,'1690751826350_admin_1688591225574_admin_0.jpg',1,0,'Green, Đại Mèo Remix',NULL),(2,'Chạy Về Khóc Với Anh','1690752368134-admin.1.mp3','2023-07-31','1690752368134_admin_chayvekhocvoianh.jpg',1,'1690752368134_admin_chayvekhocvoianh.jpg',1,0,'Erik, Duzme Remix',NULL),(3,'Sẵn Sàng Yêu Em Đi Thôi','1690752538013-admin.2.mp3','2023-07-31','1690752538013_admin_sansangyeuemdithoi.jpg',1,'1690752538013_admin_sansangyeuemdithoi.jpg',1,0,'Woni, Minh Tú, Đại Mèo Remix',NULL),(4,'Gieo Quẻ','1690752813417-admin.3.mp3','2023-07-31','1690752813417_admin_gieoque.jpg',1,'1690752813417_admin_gieoque.jpg',1,0,'Hoàng Thuỳ Linh, ĐEN, Orinn Remix',NULL),(5,'Vui Lắm Nha','1690753328762-admin.1688592304098-admin.vuilamnha.mp3','2023-07-31','1690753328762_admin_vuilamnha.jpg',1,'1690753328762_admin_vuilamnha.jpg',1,0,'Hương Ly, Jombie, RIN Music Remix',NULL),(6,'Lưu Số Em Đi','1690753658868-admin.1688592492303-admin.luusoemdi.mp3','2023-07-31','1690753658868_admin_luusoemdi.jpg',1,'1690753658868_admin_luusoemdi.jpg',1,0,'Huỳnh Văn, V.P. Tiên, Đại Mèo Remix',NULL),(7,'Như Một Người Dưng','1690753833992-admin.6.mp3','2023-07-31','1690753833992_admin_nhumotnguoidung.jpg',1,'1690753833992_admin_nhumotnguoidung.jpg',1,0,'Nguyễn Thạc Bảo Ngọc, Remix',NULL),(8,'Ôm Nhiều Mộng Mơ','1690754014222-admin.1688592678501-admin.omnhieumongmo.mp3','2023-07-31','1690754014222_admin_omnhieumongmo.jpg',1,'1690754014222_admin_omnhieumongmo.jpg',1,0,'Phát Huy T4, Đại Mèo Remix',NULL),(9,'Tình Yêu Ngủ Quên','1690754091598-admin.8.mp3','2023-07-31','1690754091598_admin_tinhyeunguquen.jpg',1,'1690754091598_admin_tinhyeunguquen.jpg',1,0,'Hoàng Tôn, LyHan, Orinn Remix',NULL),(10,'Không Bằng','1690754260690-admin.1688592868930-admin.khongbang.mp3','2023-07-31','1690754260690_admin_khongbang.jpg',1,'1690754260690_admin_khongbang.jpg',1,0,'Na, RIN Music Remix',NULL),(11,'Ai Chung Tình Được Mãi','1690754356935-admin.1688593040824-admin.aichungtinhduocmai.mp3','2023-07-31','1690754356935_admin_aichungtinhduocmai.jpg',1,'1690754356935_admin_aichungtinhduocmai.jpg',1,0,'Đinh Tùng Huy, ACV Remix',NULL),(12,'Cô Đơn Dành Cho Ai','1690754473250-admin.1688593168812-admin.codondanhchoai.mp3','2023-07-31','1690754473250_admin_codondanhchoai.jpg',1,'1690754473250_admin_codondanhchoai.jpg',1,0,'NAL, LEE KEN, Orinn Remix',NULL),(13,'Anh Muốn Đưa Em Về Không','1690754667597-admin.1688593281120-admin.anhmuonduaemvekhong.mp3','2023-07-31','1690754667597_admin_anhmuonduaemvekhong.jpg',1,'1690754667597_admin_anhmuonduaemvekhong.jpg',1,0,'Ngô Lan Hương, Đại Mèo remix',NULL),(14,'2 Phút Hơn','1690754755312-admin.1688593354063-admin.haiphuthon.mp3','2023-07-31','1690754755312_admin_haiphuthon.jpg',1,'1690754755312_admin_haiphuthon.jpg',1,0,'Phao, KAIZ Remix',NULL),(15,'Là Ai Từ Bỏ Là Ai Vô Tình','1690754869516-admin.1688593445979-admin.laaitubolaaivotinh.mp3','2023-07-31','1690754869516_admin_laaitubolaaivotinh.jpg',1,'1690754869516_admin_laaitubolaaivotinh.jpg',1,0,'Hương Ly, Jombie (G5R), RIN Music Remix',NULL),(16,'Yêu Đừng Sợ Đau','1690755034416-admin.1688593580920-admin.yeudungsodau.mp3','2023-07-31','1690755034416_admin_yeudungsodau.jpg',1,'1690755034416_admin_yeudungsodau.jpg',1,0,'Ngô Lan Hương, Cukak Remix',NULL),(18,'The Day You Went Away','1691396863936-admin.TheDayYouWentAway.mp3','2023-08-07','1691396863936_admin_thedayyouwentaway.jpg',1,'1691396863936_admin_thedayyouwentaway.jpg',1,0,'M2M',NULL),(19,'i want it that way','1691398515123-admin.i want it that way.mp3','2023-08-07','1691398515123_admin_iwantitthatway.jpg',1,'1691398515123_admin_iwanitdatway.jpg',1,0,'Backstreet Boys',NULL),(20,'THATS WHAT I WANT','1691400304111-admin.THATSWHATIWANT.mp3','2023-08-07','1691400304111_admin_thatwhatiwant.jpg',1,'1691400304111_admin_thatwhatiwant.jpg',1,0,'Lil Nas X',NULL);
/*!40000 ALTER TABLE `songs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `types`
--

DROP TABLE IF EXISTS `types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `types` (
  `type_id` int NOT NULL AUTO_INCREMENT,
  `type_name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `types`
--

LOCK TABLES `types` WRITE;
/*!40000 ALTER TABLE `types` DISABLE KEYS */;
INSERT INTO `types` VALUES (1,'POP');
/*!40000 ALTER TABLE `types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `laseName` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `userName` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `birth` date NOT NULL,
  `role_id` int NOT NULL,
  `sex` int NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `phoneNumber` varchar(11) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `avartar` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT 'user.png',
  `password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `heart` int DEFAULT '0',
  PRIMARY KEY (`user_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'dang hung','dung','admin','2023-07-13',1,1,NULL,'0355960156','user.png','$2b$10$13f0bqji1RFC1pvGBYOa5.FmJkdk6nKTxzaW8d3DS1TlB34mvvSe.',0),(2,'dang hung','dung','dunguser1','2023-08-25',2,1,NULL,'0946947481','user.png','$2b$10$AD.G3SAEk0d7lu09vk5s1eSq..it3oCceiI87UBzm32Fu9dyoXqke',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'music'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-08 21:00:30
