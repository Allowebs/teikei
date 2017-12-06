class InitSchema < ActiveRecord::Migration
  def up
    # These are extensions that must be enabled in order to support this database
    enable_extension "plpgsql"
    enable_extension "pg_trgm"
    create_table "goals", force: :cascade do |t|
      t.integer "key"
      t.string  "description"
    end
    create_table "goals_initiatives", id: false, force: :cascade do |t|
      t.integer "initiative_id", null: false
      t.integer "goal_id",       null: false
    end
    add_index "goals_initiatives", ["goal_id", "initiative_id"], name: "index_goals_initiatives_on_goal_id_and_initiative_id", using: :btree
    add_index "goals_initiatives", ["initiative_id", "goal_id"], name: "index_goals_initiatives_on_initiative_id_and_goal_id", using: :btree
    create_table "images", force: :cascade do |t|
      t.string   "file"
      t.string   "description"
      t.integer  "place_id"
      t.datetime "created_at"
      t.datetime "updated_at"
    end
    create_table "ownerships", force: :cascade do |t|
      t.integer "place_id"
      t.integer "user_id"
      t.boolean "contact_by_email", default: false
      t.boolean "contact_by_phone", default: false
    end
    add_index "ownerships", ["place_id", "user_id"], name: "index_ownerships_on_place_id_and_user_id", using: :btree
    create_table "place_connections", force: :cascade do |t|
      t.integer "place_a_id", null: false
      t.integer "place_b_id", null: false
    end
    create_table "places", force: :cascade do |t|
      t.string   "name"
      t.string   "address"
      t.string   "city"
      t.decimal  "latitude",                       precision: 15, scale: 10
      t.decimal  "longitude",                      precision: 15, scale: 10
      t.string   "accepts_new_members",                                      default: "yes"
      t.text     "description"
      t.integer  "maximum_members"
      t.text     "vegetable_products"
      t.text     "participation"
      t.string   "type"
      t.datetime "created_at"
      t.datetime "updated_at"
      t.string   "contact_function"
      t.string   "url"
      t.integer  "founded_at_year"
      t.integer  "founded_at_month"
      t.boolean  "acts_ecological",                                          default: false
      t.string   "economical_behavior"
      t.string   "animal_products"
      t.string   "beverages"
      t.text     "additional_product_information"
      t.text     "delivery_days"
    end
    create_table "roles", force: :cascade do |t|
      t.string   "name"
      t.integer  "resource_id"
      t.string   "resource_type"
      t.datetime "created_at"
      t.datetime "updated_at"
    end
    add_index "roles", ["name", "resource_type", "resource_id"], name: "index_roles_on_name_and_resource_type_and_resource_id", using: :btree
    add_index "roles", ["name"], name: "index_roles_on_name", using: :btree
    create_table "text_blocks", force: :cascade do |t|
      t.string   "name"
      t.string   "title"
      t.text     "body"
      t.string   "locale"
      t.boolean  "public"
      t.datetime "created_at"
      t.datetime "updated_at"
    end
    create_table "users", force: :cascade do |t|
      t.string   "email",                  default: "", null: false
      t.string   "encrypted_password",     default: "", null: false
      t.string   "reset_password_token"
      t.datetime "reset_password_sent_at"
      t.datetime "remember_created_at"
      t.integer  "sign_in_count",          default: 0
      t.datetime "current_sign_in_at"
      t.datetime "last_sign_in_at"
      t.string   "current_sign_in_ip"
      t.string   "last_sign_in_ip"
      t.datetime "created_at"
      t.datetime "updated_at"
      t.string   "name",                   default: "", null: false
      t.string   "confirmation_token"
      t.datetime "confirmed_at"
      t.datetime "confirmation_sent_at"
      t.string   "unconfirmed_email"
      t.string   "phone"
      t.string   "origin"
      t.string   "baseurl"
    end
    add_index "users", ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true, using: :btree
    add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
    add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
    create_table "users_roles", id: false, force: :cascade do |t|
      t.integer "user_id"
      t.integer "role_id"
    end
    add_index "users_roles", ["user_id", "role_id"], name: "index_users_roles_on_user_id_and_role_id", using: :btree
    create_table "versions", force: :cascade do |t|
      t.string   "item_type",  null: false
      t.integer  "item_id",    null: false
      t.string   "event",      null: false
      t.string   "whodunnit"
      t.text     "object"
      t.datetime "created_at"
    end
    add_index "versions", ["item_type", "item_id"], name: "index_versions_on_item_type_and_item_id", using: :btree
  end

  def down
    raise ActiveRecord::IrreversibleMigration, "The initial migration is not revertable"
  end
end
