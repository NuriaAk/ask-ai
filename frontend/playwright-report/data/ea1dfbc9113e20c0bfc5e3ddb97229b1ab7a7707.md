# Page snapshot

```yaml
- generic [ref=e2]:
  - region "Notifications (F8)":
    - list
  - region "Notifications alt+T"
  - generic [ref=e3]:
    - banner [ref=e4]:
      - generic [ref=e5]:
        - link "AgentQ" [ref=e6] [cursor=pointer]:
          - /url: /
          - img [ref=e8]
          - generic [ref=e15]: AgentQ
        - paragraph [ref=e16]: Your friendly AI agents guide
    - main [ref=e17]:
      - generic [ref=e18]:
        - generic [ref=e19]:
          - button "Go back" [ref=e20] [cursor=pointer]:
            - img [ref=e21]
          - generic [ref=e24]:
            - heading "Explorer Mode" [level=2] [ref=e25]
            - paragraph [ref=e26]: Simple, friendly explanations
          - button "Switch mode" [ref=e27] [cursor=pointer]
        - generic [ref=e29]:
          - generic [ref=e31]: 🤖
          - heading "No question is too simple" [level=3] [ref=e32]
          - paragraph [ref=e33]: Curious about AI agents? Ask anything — I'll explain it simply.
          - generic [ref=e34]:
            - button "What is an AI agent?" [ref=e35] [cursor=pointer]
            - button "How are agents different from chatbots?" [ref=e36] [cursor=pointer]
        - generic [ref=e37]:
          - generic [ref=e38]:
            - 'textbox "Ask a question like: What is an AI agent?" [active] [ref=e39]'
            - button "Send message" [disabled] [ref=e40]:
              - img [ref=e41]
          - paragraph [ref=e44]: Press Enter to send • Shift + Enter for new line
```