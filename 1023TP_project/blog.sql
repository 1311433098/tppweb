-- MySQL dump 10.11
--
-- Host: localhost    Database: psd1311_blog
-- ------------------------------------------------------
-- Server version	5.0.67-community-nt

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `blog_article`
--

DROP TABLE IF EXISTS `blog_article`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `blog_article` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `title` varchar(300) default NULL,
  `content` text,
  `uid` int(10) unsigned NOT NULL default '1',
  `cid` int(10) unsigned NOT NULL default '1',
  `ptime` int(10) unsigned NOT NULL default '0',
  `face` varchar(255) NOT NULL default 'default.gif',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `blog_article`
--

LOCK TABLES `blog_article` WRITE;
/*!40000 ALTER TABLE `blog_article` DISABLE KEYS */;
INSERT INTO `blog_article` VALUES (1,'sadfasf','dasdasdasdasdasdasd',1,0,1395644952,'532fda186d775.jpg'),(2,'dsa','asdasdasdasdasdasd',1,3,1395644991,'default.gif'),(3,'不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承','不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承受的生命之轻不能承',1,0,1395647260,'default.gif'),(4,'dasdasdasd','asdasdasdasdasd',1,0,1395648169,'default.gif'),(5,'123阿三大声大声道','阿斯顿阿斯顿阿斯顿',1,0,1395648180,'default.gif'),(6,'第三届核安全峰会今开幕 习近平将出席并提出中国核安全观','人民网3月24日电  （苏楠）本网综合，从今天（24日）开始，为期两天的第三届核安全峰会将正式开幕。来自世界各国和国际组织的50多位领导人将齐聚海牙。此次核安全峰会以“加强核安全、防范核恐怖主义”为主题。习近平主席将在峰会上提出中国的核安全观。\r\n\r\n此前，我外交部曾表示，习近平将在会上提出中国的核安全观，介绍新形势下中国在国际核安全领域采取的重要外交行动，介绍在加强核安全方面中国所采取的措施和取得的成就，并与其他有关方面共同商议如何加强国际合作。\r\n\r\n峰会活动内容丰富 六个主题\r\n\r\n核安全问题近几年引发了国际社会的广泛关注。此次峰会将有53个国家的领导人和联合国、欧盟、国际刑警组织、国际原子能机构等重要国际组织的负责人出席。峰会的活动内容丰富，形式多样，除开幕式、闭幕式、四次全会以及工作晚餐和招待会外，还将在会间穿插举行领导人互动式讨论。作为重要成果，会议还将在闭幕时发布会议报告、宣布下一次峰会举办国，与会嘉宾也将按惯例拍摄全家福。\r\n\r\n本次核安全峰会荷兰选出的六个主题：\r\n\r\n1、提高安全水平并减少对高浓缩铀及高浓缩钚的使用。我们希望看到在更少的国家、更少的地区发生更少的核裂变。\r\n\r\n2、使得更多国家认可《核材料实物保护公约》。这一重要的公约亟需足够的国家认可从而生效。我们需要34个国家的认可。理想的情况是我们可以在本次峰会召开之前使这一公约获得足够国家的认可。\r\n\r\n3、提高国际原子能机构(IAEA)核查的彻底性和频率。拥有核设施的国家可以自愿邀请IAEA对其核设施进行检查。目前，这一现象并未经常发生。\r\n\r\n4、为拥有核原料的国家进行登记，保护其高放射性的核设施，如医疗设备。即使是医疗设备的部件，如果落入不法分子手中，都有可能变成脏弹。\r\n\r\n5、让核工业在保护核原料、制定规则方面发挥更大的作用。核工业一直处于前沿并面临主要威胁。因此，核工业本身应该加入打击核恐怖主义的行列。\r\n\r\n6、确保国家发挥自身作用，保护其核设施及资源不受到威胁。\r\n\r\n中国行动展现历史担当\r\n\r\n“荷兰赞赏中国在核安全峰会中的建设性作用。中国在核安全峰会框架里扮演着主要角色。”荷兰外交部核安全峰会谈判组负责人皮特·德克勒克对人民日报记者表示。他十分钦佩中国在多个领域所做的表率，如完善核安全法规体系、制订核安全与放射性污染防治“十二五”规划及2020年远景目标、对全国核设施安全状况进行全面检查等。\r\n\r\n西班牙核论坛协会主席安东尼奥·科尔那多表示，海牙核安全峰会的举办有利于国际社会就核安全问题制定新的标准和规范，也有利于各国在核安全问题上取得更好的共识。中国国家主席习近平出席本届峰会，体现了中国对核安全问题的重视。\r\n\r\n迄今已举行两届\r\n\r\n核安全峰会自2010年开始迄今已举行两届，逐渐成为国际安全领域合作的重要平台。作为国际社会通过多边合作寻求共同核安全的重要努力，前两届核安全峰会分别于2010年、2012年在华盛顿和首尔召开，峰会反映了国际社会对核恐怖主义现实威胁的共识。\r\n\r\n首届核安全峰会于2010年4月12日至13日在美国首都华盛顿举行，主要讨论了核恐怖主义威胁、各国和国际社会的应对措施以及国际原子能机构在核安全领域的作用等问题，并发表了公报和工作计划。47个国家的领导人或代表以及联合国、国际原子能机构和欧盟等国际和地区组织负责人出席会议。\r\n\r\n第二届核安全峰会于2012年3月26日至27日在韩国首都首尔举行。该峰会是2010年华盛顿核安全峰会的后续会议，以加强核材料和核设施安全为主题，回顾2010年华盛顿峰会以来取得的进展，重点讨论加强核安全国家措施和国际合作。53个国家和4个国际组织领导人或代表与会。',29,5,1395650701,'532ff08dcc220.jpg');
/*!40000 ALTER TABLE `blog_article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog_category`
--

DROP TABLE IF EXISTS `blog_category`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `blog_category` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `name` varchar(32) default NULL,
  `pid` int(10) unsigned NOT NULL default '0',
  `path` varchar(255) NOT NULL default '0',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `blog_category`
--

LOCK TABLES `blog_category` WRITE;
/*!40000 ALTER TABLE `blog_category` DISABLE KEYS */;
INSERT INTO `blog_category` VALUES (1,'技术文章',0,'0'),(2,'PHP相关',1,'0-1'),(3,'面向对象',2,'0-1-2'),(4,'MySQL技术',1,'0-1'),(5,'心情日记',0,'0');
/*!40000 ALTER TABLE `blog_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog_profile`
--

DROP TABLE IF EXISTS `blog_profile`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `blog_profile` (
  `uid` int(10) unsigned NOT NULL default '1',
  `tname` varchar(200) default NULL,
  `age` tinyint(3) unsigned default NULL,
  `sex` tinyint(3) unsigned NOT NULL default '0',
  `pic` varchar(255) default NULL,
  `signed` text,
  `birthday` int(11) default NULL,
  `edu` tinyint(4) default NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `blog_profile`
--

LOCK TABLES `blog_profile` WRITE;
/*!40000 ALTER TABLE `blog_profile` DISABLE KEYS */;
INSERT INTO `blog_profile` VALUES (1,'管理员',35,2,'532bf46ecdf9b.jpg','我很有个性，但是不想写签名，不是因为我懒，是因为我比较个性',1231231,6),(2,'张三',30,1,'532bf6a8e4316.jpg','我是张三',NULL,4),(3,'李四',40,2,'532bf6df4d548.jpg','我是李四',NULL,5);
/*!40000 ALTER TABLE `blog_profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog_user`
--

DROP TABLE IF EXISTS `blog_user`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `blog_user` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `username` varchar(32) NOT NULL,
  `password` char(32) NOT NULL,
  `logintime` int(10) unsigned NOT NULL default '0',
  `loginip` int(11) NOT NULL default '0',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `blog_user`
--

LOCK TABLES `blog_user` WRITE;
/*!40000 ALTER TABLE `blog_user` DISABLE KEYS */;
INSERT INTO `blog_user` VALUES (1,'admin','202cb962ac59075b964b07152d234b70',1395644285,2130706433),(32,'lamp789','202cb962ac59075b964b07152d234b70',0,0),(35,'lamp123123','202cb962ac59075b964b07152d234b70',0,0),(34,'lamp7890000','4297f44b13955235245b2497399d7a93',0,0),(33,'zhangsan123123','202cb962ac59075b964b07152d234b70',0,0),(31,'zhangsan456','202cb962ac59075b964b07152d234b70',0,0),(30,'zhangsan123','202cb962ac59075b964b07152d234b70',0,0),(29,'lamp456','202cb962ac59075b964b07152d234b70',0,0),(28,'lamp123','202cb962ac59075b964b07152d234b70',0,0);
/*!40000 ALTER TABLE `blog_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-03-24  9:07:58
