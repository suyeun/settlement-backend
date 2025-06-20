-- 기본 사용자 생성 (테스트용)
INSERT INTO users (username, password, name, "isActive", created_at, updated_at) 
VALUES ('admin', '$2b$10$rXUYxjxZJVGtqH5LVGGmAeWLbzgB1Q6uHK1/5U4jqJ2UzPUzHdL7K', '관리자', true, NOW(), NOW())
ON CONFLICT (username) DO NOTHING;

-- 샘플 정산 데이터 (이미지 기준)
INSERT INTO settlements (
  settlement_month, 
  company_count, 
  employee_count, 
  billing_amount, 
  commission, 
  deposit_date, 
  settlement_commission, 
  note, 
  amount, 
  settlement_date,
  created_at,
  updated_at
) VALUES 
  ('2024-03', 2, 3, 7899500, 492560, '2024-04-10', 123140, '정산일자', 123140, '2024-02-29', NOW(), NOW()),
  ('2024-04', 2, 2, 5000000, 300000, '2024-05-10', 80000, '비고', 80000, '2024-03-31', NOW(), NOW()),
  ('2024-05', 3, 3, 6500000, 400000, '2024-06-10', 90000, NULL, 90000, '2024-04-30', NOW(), NOW())
ON CONFLICT DO NOTHING; 