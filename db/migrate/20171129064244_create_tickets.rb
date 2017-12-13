class CreateTickets < ActiveRecord::Migration[5.1]
  def change
    create_table :tickets do |t|
      t.string :subject
      t.integer :status
      t.integer :priority
      t.date :deadline
      t.integer :assign_to
      t.integer :requester
      t.integer :team_id


      t.timestamps
    end
  end
end
