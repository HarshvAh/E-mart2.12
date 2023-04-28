DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS review;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS delivery_agent;
DROP TABLE IF EXISTS seller_profile;
DROP TABLE IF EXISTS buyer_profile;
DROP TABLE IF EXISTS login;


create table login
    (user_id        varchar(15),
        hashed_password    varchar(80),
        who         varchar(15)
        check (who in ('Buyer', 'Seller', 'DeliveryAgent', 'Admin')), 
        primary key (user_id)
);

create table buyer_profile
    (user_id        varchar(15), 
     name        varchar(20), 
     addr        varchar(150)[],
     pincode     char(6)[],
     in_cart     varchar(10)[],
     primary key (user_id),
     foreign key(user_id) references login
        on delete set null
);

create table seller_profile
    (user_id        varchar(15), 
     name        varchar(20),
     primary key (user_id),
     foreign key(user_id) references login
        on delete set null
);

create table delivery_agent
    (user_id        varchar(15),
     name           varchar(20),
     pincode        char(6)[],
     primary key (user_id),
     foreign key(user_id) references login
        on delete set null
);

create table product
    (product_id        char(36),
     seller_id         varchar(15),
     photo_addr        varchar(300),
     addr              varchar(150),
     pincode           char(6),
     name              varchar(50),
     detail            varchar(300),
     price             numeric(12, 3) check (price > 0),
     quantityAvailable numeric(10, 0) check (quantityAvailable >= 0),
    --  rating            numeric(3, 2)  check (rating >= 0 and rating<=5),
     primary key (product_id),
     foreign key (seller_id) references seller_profile(user_id)
        on delete set null
);

create table review
    (user_id         varchar(15),
     product_id      varchar(8),
     rating          numeric(3, 2)  check (rating >= 0 and rating<=5),
     review          varchar(300),
    --  seller_id       varchar(15),
    --  addr            varchar(150),
     primary key (user_id, product_id),
     foreign key (user_id) references buyer_profile
        on delete set null,
     foreign key (product_id) references product(product_id)
);

create table orders
    (user_id         varchar(15), 
     product_id      varchar(8),
     order_id        varchar(15),
     order_date      timestamp default NULL,
     estimate_date   timestamp default NULL,
     current_status  varchar(20) check (current_status in ('processing', 'transit', 'shipped', 'out_for_delivery', 'delivered')),
    --  seller_id       varchar(15),
     addr            varchar(150),
     pincode         char(6),
    --  primary key (user_id, product_id),
     primary key (order_id),
     foreign key (user_id) references buyer_profile on delete set null,
     foreign key (product_id) references product(product_id)
);