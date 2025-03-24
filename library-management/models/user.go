package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	ID       uint      `gorm:"primaryKey"`
	Name     string    `gorm:"not null;check:name ~'^[A-Za-z]+$'"`
	Email    string    `gorm:"unique;not null"`
	Contact  string    `gorm:"not null; check :char_length(contact)=10 And contact ~'^[0-9]+$'"`
	Role     string    `gorm:"type:varchar(50);check:role IN ('owner', 'admin', 'user')"`
	Password string    `gorm:"not null"`
	Library  []Library `gorm:"many2many:UserLibrary;"`
}
