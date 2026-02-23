CREATE TABLE `feedback` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(20),
	`subject` varchar(255) NOT NULL,
	`message` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `feedback_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tours` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`duration` varchar(100) NOT NULL,
	`nights` int,
	`price` int NOT NULL,
	`category` varchar(100) NOT NULL,
	`highlights` text,
	`included` text,
	`imageUrl` varchar(512),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `tours_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `userApplications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`tourId` int,
	`firstName` varchar(100) NOT NULL,
	`lastName` varchar(100) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(20) NOT NULL,
	`groupSize` int NOT NULL,
	`budget` varchar(100),
	`preferredDates` varchar(255),
	`preferences` text,
	`specialRequests` text,
	`telegramSent` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `userApplications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `userApplications` ADD CONSTRAINT `userApplications_tourId_tours_id_fk` FOREIGN KEY (`tourId`) REFERENCES `tours`(`id`) ON DELETE no action ON UPDATE no action;