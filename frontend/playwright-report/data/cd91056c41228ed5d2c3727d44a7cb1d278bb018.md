# Page snapshot

```yaml
- generic [ref=e2]:
  - region "Notifications (F8)":
    - list
  - region "Notifications alt+T"
  - generic [ref=e3]:
    - banner [ref=e4]:
      - link "AgentQ" [ref=e6] [cursor=pointer]:
        - /url: /
        - img [ref=e8]
        - generic [ref=e11]: AgentQ
    - main [ref=e12]:
      - generic [ref=e13]:
        - generic [ref=e14]:
          - button "Go back" [ref=e15] [cursor=pointer]:
            - img [ref=e16]
          - generic [ref=e18]:
            - heading "Explorer Mode" [level=2] [ref=e19]
            - paragraph [ref=e20]: Simple, friendly explanations
          - button "Switch mode" [ref=e21] [cursor=pointer]
        - generic [ref=e23]:
          - generic [ref=e25]: 🤖
          - heading "No question is too simple" [level=3] [ref=e26]
          - paragraph [ref=e27]: Curious about AI agents? Ask anything — I'll explain it simply.
          - generic [ref=e28]:
            - button "What is an AI agent?" [ref=e29] [cursor=pointer]
            - button "How are agents different from chatbots?" [ref=e30] [cursor=pointer]
        - generic [ref=e31]:
          - generic [ref=e32]:
            - 'textbox "Ask a question like: What is an AI agent?" [active] [ref=e33]'
            - button "Send message" [disabled] [ref=e34]:
              - img [ref=e35]
          - paragraph [ref=e38]: Press Enter to send • Shift + Enter for new line
```