# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create(name: "Minh Chien", email: "tmc@gmail.com", password: "123456", password_confirmation: "123456", role: "3",team_id: 1)
User.create(name: "Trung Dut", email: "dut@gmail.com", password: "123456", password_confirmation: "123456", role: "3",team_id: 2)
rand = Random.new
30.times do |n|
  name = Faker::Name.name
  email  = "staff-#{n+1}@gmail.org"
  password = "password"
  role = 2
  team = rand(1...3)
  User.create!(name: name, email: email,role: role, team_id: team, password: password, password_confirmation: password )
end

50.times do |n|
  subject = Faker::Lorem.sentence
  team_id = rand(1...3)
  assign_to = rand(3...33)
  requester = rand(33...63)
  priority = rand(1...4)
  status = rand(1..6)
  deadline = (Date.today + rand(-6...11).days).to_s
  if deadline > Date.today.to_s
    status = 6
  end
  Ticket.create!(subject: subject,status: status, team_id: team_id, assign_to: assign_to, requester: requester, priority: priority,deadline: deadline)
end

10.times do |n|
  subject = Faker::Lorem.sentence
  team_id = rand(1...3)
  assign_to = rand(3...33)
  requester = 33
  priority = rand(1...4)
  deadline = (Date.today + rand(1...11).days).to_s
  Ticket.create!(subject: subject,status: 2, team_id: team_id, assign_to: assign_to, requester: requester, priority: priority,deadline: deadline)
end

20.times do |n|
  subject = Faker::Lorem.sentence
  team_id = rand(1...3)
  assign_to = rand(3...33)
  requester = 33
  priority = rand(1...4)
  deadline = (Date.today + rand(-4...-1).days).to_s
  Ticket.create!(subject: subject,status: 2, team_id: team_id, assign_to: assign_to, requester: requester, priority: priority,deadline: deadline)
end

20.times do |n|
  subject = Faker::Lorem.sentence
  team_id = rand(1...3)
  assign_to = rand(3...33)
  requester = 33
  priority = rand(1...4)
  deadline = (Date.today + rand(3...9).days).to_s
  Ticket.create!(subject: subject,status: 4, team_id: team_id, assign_to: assign_to, requester: requester, priority: priority,deadline: deadline)
end


50.times do |n|
  subject = Faker::Lorem.sentence
  team_id = rand(1...3)
  assign_to = rand(3...33)
  requester = rand(33...63)
  priority = rand(1...4)
  status = rand(1..6)
  deadline = (Date.today + rand(-6...11).days).to_s
  Ticket.create!(subject: subject, team_id: team_id,assign_to: assign_to, requester: requester, priority: priority,deadline: deadline,status: status)
end

30.times do |n|
  name = Faker::Name.name
  email  = "user-#{n+1}@gmail.org"
  password = "password"
  role = 1
  User.create!(name: name, email: email,role: role, password: password, password_confirmation: password )
end

30.times do |n|
  subject = Faker::Lorem.sentence
  team_id = rand(1...3)
  assign_to = rand(3...33)
  requester = 33
  priority = rand(1...4)
  deadline = (Date.today + rand(-6...11).days).to_s
  Ticket.create!(subject: subject, team_id: team_id,status: 1, assign_to: assign_to, requester: requester, priority: priority,deadline: deadline)
end

30.times do |n|
  subject = Faker::Lorem.sentence
  team_id = rand(1...3)
  assign_to = 3
  requester = rand(33...63)
  priority = rand(1...4)
  deadline = (Date.today + rand(-6...11).days).to_s
  Ticket.create!(subject: subject, team_id: team_id,status: 3, assign_to: assign_to, requester: requester, priority: priority,deadline: deadline)
end

30.times do |n|
  subject = Faker::Lorem.sentence
  team_id = rand(1...3)
  assign_to = 3
  requester = rand(33...63)
  priority = rand(1...4)
  deadline = (Date.today + rand(6...11).days).to_s
  Ticket.create!(subject: subject, team_id: team_id,status: 1, assign_to: assign_to, requester: requester, priority: priority,deadline: deadline)
end

30.times do |n|
  subject = Faker::Lorem.sentence
  team_id = rand(1...3)
  assign_to = 3
  requester = rand(33...63)
  priority = rand(1...4)
  deadline = (Date.today + rand(6...11).days).to_s
  Ticket.create!(subject: subject, team_id: team_id,status: 2, assign_to: assign_to, requester: requester, priority: priority,deadline: deadline)
end

tickets = Ticket.all
tickets.each do |t|
  next if t.status == 1
  subject = Faker::Lorem.sentence
  user_id = rand(1...30)
  t.comments.create(content: subject,user_id: user_id)
  t.comments.create(content: subject,user_id: user_id + 2)
end
Ticket.all.each do |t|
  t.relations.create(user_id: 3)
end
User.create(name: "Tuan Anh", email: "piggy@gmail.com", password: "123456", password_confirmation: "123456", role: "4",team_id: 1)