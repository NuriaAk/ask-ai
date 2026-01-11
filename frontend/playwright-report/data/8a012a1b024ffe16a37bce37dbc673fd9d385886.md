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
          - generic [ref=e11]: AgentQ
        - paragraph [ref=e12]: Your friendly AI agents guide
    - main [ref=e13]:
      - generic [ref=e14]:
        - generic [ref=e15]:
          - button "Go back" [ref=e16] [cursor=pointer]:
            - img [ref=e17]
          - generic [ref=e19]:
            - heading "Explorer Mode" [level=2] [ref=e20]
            - paragraph [ref=e21]: Simple, friendly explanations
          - button "Switch mode" [ref=e22] [cursor=pointer]
        - generic [ref=e24]:
          - generic [ref=e26]: 🤖
          - heading "No question is too simple" [level=3] [ref=e27]
          - paragraph [ref=e28]: Curious about AI agents? Ask anything — I'll explain it simply.
          - generic [ref=e29]:
            - button "What is an AI agent?" [ref=e30] [cursor=pointer]
            - button "How are agents different from chatbots?" [ref=e31] [cursor=pointer]
        - generic [ref=e32]:
          - generic [ref=e33]:
            - 'textbox "Ask a question like: What is an AI agent?" [active] [ref=e34]'
            - button "Send message" [disabled] [ref=e35]:
              - img [ref=e36]
          - paragraph [ref=e39]: Press Enter to send • Shift + Enter for new line
```