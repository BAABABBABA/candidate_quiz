UPDATE candidate_quiz_database.user
SET favorite_song = CASE 
    WHEN name = 'User1' THEN JSON_ARRAY(1, 2, 3)
    WHEN name = 'User2' THEN JSON_ARRAY(4, 5, 6)
    WHEN name = 'User3' THEN JSON_ARRAY(7, 8, 9)
    WHEN name = 'User4' THEN JSON_ARRAY(1, 4, 7)
    WHEN name = 'User5' THEN JSON_ARRAY(2, 5, 8)
    WHEN name = 'User6' THEN JSON_ARRAY(3, 6, 9)
    WHEN name = 'User7' THEN JSON_ARRAY(1, 2, 3)
    WHEN name = 'User8' THEN JSON_ARRAY(4, 5, 6)
    WHEN name = 'User9' THEN JSON_ARRAY(7, 8, 9)
    WHEN name = 'User10' THEN JSON_ARRAY(1, 2, 3)
    ELSE favorite_song
END
WHERE name IN ('User1', 'User2', 'User3', 'User4', 'User5', 'User6', 'User7', 'User8', 'User9', 'User10');