# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
types = ['portapotty', 'public', 'outhouse', 'store']
50.times do
  toilet = Toilet.create!(name: Faker::Address.street_name,
                          description: Faker::Lorem.sentence(5),
                          toilet_type: types.sample,
                          lng: -75 + rand * 10,
                          lat: 40 + rand * 10)
end
