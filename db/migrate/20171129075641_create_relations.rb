class CreateRelations < ActiveRecord::Migration[5.1]
  def change
    create_table :relations do |t|
      t.integer :ticket_id
      t.integer :user_id


      t.timestamps
    end
    add_index :relations,[:ticket_id, :user_id]
  end
end
