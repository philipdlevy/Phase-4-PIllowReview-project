# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


item1 = Item.create(name: "Toy", price: 27.99, description: "Super fun toy that can keep any entertaied for hours and hours and you'll never stop playing with it ever", image_url: "https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/6101036512835-2?fmt=jpeg&qlt=90&wid=652&hei=652")

user1 = User.create(username: "Johndidnothing1990", password: "Password1")

review1 = Review.create(title: "It's a review", body: "Lots of stuff goes here", rating: 3, item_id: 9, user_id: 1)


