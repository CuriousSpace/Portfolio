# YUN KISOO
**Senior Backend Engineer | High-Performance Systems & Cloud Architecture**  
Busan, South Korea | +82 10-8215-5781 | silverromance@hanmail.net  
[LinkedIn](https://linkedin.com/in/kisoo-yun-231b141a7) | [GitHub](https://github.com/CuriousSpace) | [Portfolio](https://curiousspace.github.io/Portfolio/)

---

## PROFESSIONAL SUMMARY
Senior Backend Engineer with 7+ years of experience across South Korea and Japan, specializing in high-performance API core design, database optimization, and enterprise architecture modernization. Proven track record of reducing query latency by 95%, designing multi-tenant authorization engines, building automated data ingestion tools, and achieving zero downtime on AWS. Experienced in asynchronous, documentation-driven engineering (RFCs, ADRs, PR reviews) across cross-border distributed teams. Holds AWS Certified Solutions Architect – Associate (SAA).

---

## TECHNICAL SKILLS
- **Languages:** Java (21), C# (.NET Core, WinForms), PHP, Python, SQL, JavaScript/TypeScript
- **Frameworks & Core:** Spring Boot (3.x), Spring Security, Spring Data JPA, QueryDSL, MyBatis, ASP.NET Core, Laravel
- **Databases & Caching:** MariaDB, MySQL, PostgreSQL, Google BigQuery, Caffeine Local Cache
- **Messaging & Real-Time:** Spring WebSocket (STOMP), SockJS, FCM, Naver Cloud SENS
- **Cloud & DevOps (AWS SAA):** AWS (EC2, RDS, S3, CloudFront, Athena, CloudWatch, Elastic Beanstalk), Docker, Nginx, GitHub Actions
- **Architecture & Patterns:** Multi-Tenancy Scope Isolation, Transactional Outbox Pattern, Micro-tools/MCP, RESTful APIs
- **Working Languages:** Korean (Native), Japanese (Business Proficient / JLPT N1), English (Professional - Text/Async)

---

## WORK EXPERIENCE

### Gangnam & Inconus Co., Ltd. — Senior Backend Engineer / Corporate R&D Lead
*Sep 2025 – Present | Busan, South Korea*
- Led backend architecture and cloud operations for the B2B Enterprise Smart Safety Management SaaS (LH KeepME v2).
- **Database & Query Optimization:** Restructured raw-log aggregation queries using DB time-bucketing and composite indexing (`workplace_id`, `measure_date`, `status`) via MyBatis, reducing response latency from **2,000ms+ to 80ms (95% latency reduction)**.
- **Resilient In-Memory Caching:** Replaced commercial weather APIs with Korea Meteorological Administration (KMA) public APIs and implemented a 10-30m TTL **Caffeine Cache** layer, cutting redundant calls by **80%+** and reducing latency to **<5ms**.
- **Multi-Tenant Authorization Engine:** Designed `ReadScopeResolver` and `AgencyHierarchyService` to enforce 3-tier organizational data isolation (Client > Prime Contractor > Subcontractor), ensuring **100% data consistency** between pagination totals (`totalCount`) and filtered record sets.
- **Asynchronous Messaging Architecture:** Architected a **Transactional Outbox Pattern** to decouple real-time mobile push (FCM), Kakao AlimTalk, and STOMP broadcasts from database business transactions, ensuring zero message loss during external network outages.
- **Cloud Stability & OOM Triage:** Diagnosed EC2 memory exhaustion caused by storage I/O stalls via CloudWatch; provisioned a 2GB Linux swap space to absorb transient spikes, achieving **zero server downtime**.
- **Cloud Cost Optimization:** Decommissioned 7 dormant Elastic Beanstalk environments and purged orphaned Route53 DNS records, significantly cutting fixed cloud infrastructure expenses.
- **Regulatory Compliance & Security:** Built an automated **AES-256** database-level encryption and decryption pipeline for GPS coordinates alongside access audit trail registries to satisfy regulatory compliance for Location-Based Services (LBS).
- **Developer Tooling & Testing Infrastructure:** Built a standalone browser-based **WebSocket/STOMP Debug Console** (supporting STOMP/Raw WebSocket, SockJS, custom headers, and preset management) to isolate and verify backend real-time endpoints independently of frontend delivery. Configured a custom local Model Context Protocol (MCP) server to index and cross-reference multiple enterprise repositories.

### Smart Social Co., Ltd. — Senior Software Engineer (Lead)
*May 2023 – Aug 2025 | Busan, South Korea*
- **Dynamic Localization Architecture:** Overhauled localization pipeline for multicultural student career platform (`da2um.kr`) by replacing hardcoded templates with a unified Excel-driven dynamic rendering engine, reducing maintenance overhead by **~90%**.
- **Security & Middleware Recovery:** Resolved an emergency SSO outage for University LINC 3.0 platform by refactoring legacy Spring Boot middleware under blocked-port conditions, migrating to alternate ports, and establishing HTTPS/TLS encryption.
- **Internal Automation Pipelines:** Engineered automated Python scripts (Virtualenv, Pandas, Openpyxl) over Bastion SSH port-forwarding to extract relational database schemas and automate bulk operational data ingestion (`readExcel`), eliminating repetitive manual database operations.
- **Feasibility & Availability Auditing:** Led technical feasibility and licensing ROI assessments for third-party enterprise integrations (Canva, Slack API); instituted daily health-check routines across production endpoints.

### AXAS Co., Ltd. — Software Engineer (Enterprise SI Division)
*Apr 2019 – Apr 2023 | Osaka, Japan*
- **Enterprise Legacy Modernization:** Reverse-engineered mission-critical railway station master software from COBOL to C# Forms, modernizing functional business algorithms and UI workflows. Migrated on-premise Delphi manufacturing process management systems into intranet C# web applications, modernizing DAT batch routines and stored procedures.
- **Large-Scale Data Query Tuning:** Conducted deep query execution plan analysis across PostgreSQL and Google BigQuery for a nationwide electronics retailer, eliminating unindexed scans and optimizing batch analytical processing.
- **Quality Assurance & Verification:** Established exhaustive test specifications, automated test data scripts, and defect reproduction workflows, guaranteeing **zero data regression and calculation discrepancies** during language and framework transitions.

---

## CERTIFICATIONS & EDUCATION
- **AWS Certified Solutions Architect – Associate (SAA)** | Amazon Web Services (2025.05)
- **AWS Certified Cloud Practitioner (CLF)** | Amazon Web Services (2025.04)
- **Japanese Language Proficiency Test (JLPT) N1** | Japan Foundation (2025.08)
- **B.S. in Management Information Systems (MIS)** | Dong-eui University, South Korea (2012.03 – 2019.02)
