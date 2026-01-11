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
        - generic [ref=e22]:
          - generic [ref=e23]:
            - img [ref=e25]
            - generic [ref=e30]: What is an AI agent?
          - generic [ref=e31]:
            - img [ref=e33]
            - generic [ref=e38]: "GraphRAG response (simple): AI agents perceive inputs, reason about goals, and take actions through tools or workflows. They combine a reasoning engine, memory, and tool access to complete tasks. Ask another question and I will keep it friendly and clear."
        - generic [ref=e39]:
          - generic [ref=e40]:
            - 'textbox "Ask a question like: What is an AI agent?" [ref=e41]'
            - button "Send message" [disabled] [ref=e42]:
              - img [ref=e43]
          - paragraph [ref=e46]: Press Enter to send • Shift + Enter for new line
```