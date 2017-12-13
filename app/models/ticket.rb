class Ticket < ApplicationRecord
  has_many :relations,foreign_key: :ticket_id
  has_many :users, through: :relations
  belongs_to :customer, class_name: "User",foreign_key: :requester,optional: true
  belongs_to :staff, class_name: "User",foreign_key: :assign_to,optional: true
  has_many :comments,foreign_key: :ticket_id
  belongs_to :team,foreign_key: :team_id,optional: :true
  default_scope -> { order(created_at: :desc) }
  # attr_accessor :assign_name
  # assign_name = User.find(assign_to).name
  # attr_accessor :assign_name
  # def assign_name
  #   return User.find(assign_to).name
  # end

end