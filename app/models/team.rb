class Team < ApplicationRecord
  has_many :users,foreign_key: :team_id
  has_many :tickets,foreign_key: :team_id
end
