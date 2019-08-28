class CreateWmGoals < ActiveRecord::Migration[5.2]
  def change
    create_table :wm_goals do |t|
      t.string :type
      t.integer :number

      t.timestamps
    end
  end
end
