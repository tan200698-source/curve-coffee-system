
//สร้างตราง breakfast เวลาขาย 07:00 - 12:00
CREATE TABLE category_availability (
    id SERIAL PRIMARY KEY,
    category_id INTEGER UNIQUE NOT NULL,
    available_from TIME,
    available_until TIME,
    is_enabled BOOLEAN DEFAULT true,
    FOREIGN KEY (category_id)
        REFERENCES categories(id)
        ON DELETE CASCADE
);

INSERT INTO category_availability (
    category_id,
    available_from,
    available_until,
    is_enabled
)
VALUES (
    6,
    '07:30',
    '12:00',
    true
);
//------------------------------

