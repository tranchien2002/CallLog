class Relation < ApplicationRecord
  belongs_to :Ticket
  belongs_to :User
end
