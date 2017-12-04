class CreateRelations < ActiveRecord::Migration[5.1]
  def change
    create_table :relations do |t|
      t.references :ticket, foreign_key: true
      t.references :user, foreign_key: true
      t.integer :type

      t.timestamps
    end
    add_index :relations,[:ticket_id, :user_id]
  end
end
