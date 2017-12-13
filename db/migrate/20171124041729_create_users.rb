class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.integer :role
      t.integer :team_id

      t.string :password_digest
      t.string :remember_digest
      t.string :auth_token


      t.timestamps
    end
    add_index :users, :email, unique: true
  end
end
